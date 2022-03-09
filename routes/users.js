///const createError = require('http-errors')
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express.Router()
const users = JSON.parse(fs.readFileSync('users.json','utf-8')) 

//variables
var readonly = 'readonly';

//defaul options 
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


//routes

app.get('/users', (req,res) => {
    const users = JSON.parse(fs.readFileSync('users.json','utf-8')) 
    res.render('users', {users})
})



app.get('/users/:id', (req,res) => {
    const users = JSON.parse(fs.readFileSync('users.json','utf-8'))
    const id = req.params.id;
    const user = users.find(user => {
        if(user.id == id){
            console.log("find")
            return user;
        }else{
            console.log("user not find");
            /*res.redirect('/users')*/
        }
    } )
    console.log(user);
    res.render('profile', {user,readonly});

})


module.exports = app;