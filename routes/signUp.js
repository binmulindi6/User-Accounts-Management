const createError = require('http-errors')
const express = require('express')
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const app = express.Router()
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const { concat } = require('async')
const { route } = require('./login')

//Variables

const users = JSON.parse(fs.readFileSync('users.json', "utf-8"))
var readonly = '';
var  error = {
    username: "",
    email: "",
    password : "",
};

//default options
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));


//routes
app.get('/signUp', (req,res) => {
    res.render('signUp', {error})
})

app.get('/signup', (req,res) => {
    res.redirect('/signUp')
})

app.get('/signup/users', (req,res) => {
    res.send(users)
})

app.post('/signUp', async (req,res) => {
    const time = new Date().getTime();
    try {
        const hashedPassword = await bcrypt.hash(req.body.confirmPassword.trim(), 10)
        /*console.log(req.body)*/
        const user = {
              id : time,
              category: "normal",
              image: "avatar.png",
              firstName: req.body.fname.trim(),
              lastName: req.body.lname.trim(),
              sex: req.body.sex.trim(),
              birthday: req.body.bday.trim(),
              email : req.body.email.trim().toLowerCase(),
              telephone: req.body.telephone.trim(),
              username: req.body.username.trim(),
              password: hashedPassword,
              address : "",
              country : ""

            }
        

        //Check if Username or Email Already Exists in the System
        var exists = 0;
        users.forEach(dbUser => {
            /*const tst = dbUser.includes(user.username);
            console.log(tst);*/
            if(dbUser.username == user.username ){
                error.username = 'already exists'
                exists = 1;

            }
            if(dbUser.email == user.email ){
                error.email = 'already exists'
                exists = 1;
            }
        });

        if(exists == 0){
            users.push(user)
            console.log('sent')
            SaveUser()
            //fs.writeFileSync('users.json', JSON.stringify(users))
            error.username = "";
            error.email = "";
            res.redirect('/profile/edit/'+ user.username)
            
        }else{
            res.redirect('/signUp')
        }
    
      } catch {
        res.status(500).send("error")
      }

})

function SaveUser(){
    fs.writeFileSync('users.json', JSON.stringify(users))
    console.log('saved')
}

module.exports = app;
