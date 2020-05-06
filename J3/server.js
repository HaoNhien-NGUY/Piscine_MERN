const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const sha1 = require('sha1');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27042/mern-pool', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connection successful');
});

const userModel = require('./models/userModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.set('view engine', 'ejs');

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/profile', function (req, res) {
    if(sess.user) {
        res.render('profile', {login: sess.user.login})
    } else {
        res.render('login');
    }
})

app.post('/register', function (req, res) {
    if(req.body.password === req.body.confirmpw){
        const user = new userModel({
            login: req.body.login,
            email: req.body.email,
            password: sha1(req.body.password)
        });
        user.save({}, (err, resp) => {
            if (err) {
                res.status(400).render('register', err.errors);
            } else {
                sess=req.session;
                sess.user = user;
                console.log(user);
                return res.redirect(200, '/profile');
            }
        });
    } else {
        res.status(400).render('register', {errorPassword : 'Password do not match'});
    }
});

app.post('/login', function (req, res) {
    userModel.find({login: req.body.login, password: sha1(req.body.password)}, (err, resp) => {
        if( resp.length > 0) {
            sess=req.session;
            console.log(resp[0]);
            sess.user = resp[0];
            return res.redirect(200, '/profile');
        } else {
            res.send('invalide input');
        }
    });
});

app.listen(4242);