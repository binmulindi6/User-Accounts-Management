const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const { concat } = require('async')



//Routes
const loginRouter = require('./routes/login')
const signUpRouter = require('./routes/signUp')
const usersRouter = require('./routes/users')
const profileRouter = require('./routes/profile')

//express app
const app = express()

// default options
app.use(express.static('public'));
app.use('/', loginRouter);
app.use('/',signUpRouter);
app.use('/', usersRouter);
app.use('/', profileRouter);
/*app.use('/', signUpRouter);**/


//engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

//server port

const port = process.env.PORT || 5000
app.listen(port);

module.exports = app;