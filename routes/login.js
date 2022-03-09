const createError = require('http-errors')
const express = require('express')
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
//const passport = require('passport')
//const session = require('express-session')
//const LocalStrategy = require('passport-local').Strategy
const app = express.Router()
const path = require('path')
const fs = require('fs')
const { concat } = require('async')
const res = require('express/lib/response')
const users = JSON.parse(fs.readFileSync('users.json','utf-8')) 

//defaul options
//app.use(passport.session())
//app.use(session)
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

// notify
var error = "";

//PASS


//routes
app.get('/login', (req,res) => {
    //res.send('GOO!')
    res.render('login', {error})
})

/*app.get('/users', (req,res) => {
  res.send(users)
})*/

app.get('/', (req,res) => {
  res.redirect('/login')
})

/*app.post('/login',  async (req,res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
          username: req.body.username,
          password: hashedPassword
        }

    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }

})*/

//Authentication

app.post('/login', async(req,res) => {
  const user = users.find(user => user.username == req.body.username.trim() || user.email == req.body.username.toLowerCase().trim())
  if (user == null){
    error = 'Incorrect Username*';
    res.status(400).redirect('/');
  }
      try {
          if(await bcrypt.compare(req.body.password, user.password)) {
            if(user.category == "admin"){
              res.redirect('/users');
            }else{
              res.redirect('/users/' + user.id)
            }
            
          } else {
            error = 'Incorect username or Password*';
            res.redirect('/');
          }
      } catch {
        res.status(500).send()
      }
})

module.exports = app