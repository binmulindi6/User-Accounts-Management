///const createError = require('http-errors')
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express.Router()
const users = JSON.parse(fs.readFileSync('users.json','utf-8')) 

//variables

//defaul options 
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


//routes

app.get('/profile/:id', (req,res) => {
    const users = JSON.parse(fs.readFileSync('users.json','utf-8'))
    const id = req.params.id;
    const user = users.find(user => {
        if(user.username == id){
            console.log("find")
            return user;
        }else{
            console.log("user not find");
            /*res.redirect('/users')*/
        }
    } )
    console.log(user);
    res.render('profile', {user});
})

app.get('/profile/edit/:id', (req,res) => {
    const users = JSON.parse(fs.readFileSync('users.json','utf-8'))
    const id = req.params.id;
    const user = users.find(user => {
        if(user.username == id){
            console.log("find")
            return user;
        }else{
            console.log("user not find");
            /*res.redirect('/users')*/
        }
    } )
    /*console.log(user);*/
    res.render('profile-edit', {user});
})

app.post('/profile/edit/:id', (req,res) => {

    try{
        const users = JSON.parse(fs.readFileSync('users.json','utf-8'))
        const id = req.params.id;
        const user = users.find(user => {
            if(user.username == id){
                console.log("find")
                return user;
            }else{
                console.log("user not find");
                /*res.redirect('/users')*/
            }
        } )

        // seach for the user index to update details
        var userIndex = users.indexOf(user);
        console.log("index:" + userIndex);
        console.log(req.body);

        //insert new users details
        updateUser(req,users,userIndex);

        //save changes
        SaveUser(users);
        res.redirect('/profile/'+user.username)

    }catch(err){
        console.log(err)
        res.redirect('/profile/edit/'+user.username)
    }



})


function updateUser(req,users,index) {
    users[index].firstName =  req.body.fname.trim(),
    users[index].lastName =  req.body.lname.trim(),
    users[index].sex =  req.body.sex,
    users[index].birthday =  req.body.bday.trim(),
    users[index].email  =  req.body.email.trim().toLowerCase(),
    users[index].telephone =  req.body.telephone.trim(),
    users[index].address  =  req.body.address.trim(),
    users[index].country  =  req.body.country

    console.log('user updated')
    console.log(users[index]);
}

function SaveUser(users){
    fs.writeFileSync('users.json', JSON.stringify(users))
}

/*app.get('/profile/:id', (req,res) => {
    const users = JSON.parse(fs.readFileSync('users.json','utf-8'))
    const id = req.params.id;
    const user = users.find(user => {
        if(user.id == id){
            console.log("find")
            return user;
        }else{
            console.log("user not find");
            /*res.redirect('/users')*//*
        }
    } )
    console.log(user);
    res.render('profile', {user,readonly});

})*/


module.exports = app;