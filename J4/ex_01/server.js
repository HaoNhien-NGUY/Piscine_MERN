const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const sha1 = require('sha1');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27042/mern-pool', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connection successful');
});

const userModel = require('./models/userModel');
const productModel = require('./models/productModel');
const categoryModel = require('./models/categoryModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.set('view engine', 'ejs');

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/profile', isAuthenticated, function (req, res) {
    if (req.session.user.admin == true) {
        res.render('profile', { login: sess.user.login, admin: true });
    } else {
        res.render('profile', { login: sess.user.login });
    }
});

app.get('/boutique', isAuthenticated, function (req, res) {
    productModel.find({}, (err, resp) => {
        res.render('boutique', { 'products': resp });
    });
});

app.get('/boutique/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    productModel.findById(id, (err, resp) => {
        res.render('product', { 'product': resp });
    });
});

app.get('/admin', isAdmin, function(req, res) {
    res.render('admin');
})

app.get('/admin/add/product', isAdmin, function (req, res) {
    res.render('addproduct.ejs');
});

app.get('/admin/add/category', isAdmin, function (req, res) {
    res.render('addcategory.ejs');
});

app.post('/admin/add/category', function (req, res) {
    const category = new categoryModel({
        name: req.body.name
    });
    category.save({}, (err, resp) => {
        if (err) {
            res.status(400).render('addcategory', {'errormsg' : 'an error occured'});
        } else {
            res.render('addcategory', { 'success': true });
        }
    });
});

app.post('/admin/add/product', function (req, res) {
    const product = new productModel({
        title: req.body.title,
        price: req.body.price,
        desc: req.body.description
    });
    product.save({}, (err, resp) => {
        if (err) {
            res.status(400).render('addproduct', {'errormsg' : 'an error occured'});
        } else {
            categoryModel.findOne({name: req.body.category}, function(err, category) {
                if (category) {
                    product.desc.push(category);
                    product.save();
                }
            })
            res.render('addproduct', { 'success': true });
        }
    });
});

app.post('/register', function (req, res) {
    if (req.body.password === req.body.confirmpw) {
        const user = new userModel({
            login: req.body.login,
            email: req.body.email,
            password: sha1(req.body.password)
        });
        user.save({}, (err, resp) => {
            if (err) {
                res.status(400).render('register', err.errors);
            } else {
                sess = req.session;
                sess.user = user;
                console.log(user);
                res.status(200).redirect('/profile');
            }
        });
    } else {
        res.status(400).render('register', { errorPassword: 'Password do not match' });
    }
});

app.post('/login', function (req, res) {
    userModel.find({ login: req.body.login, password: sha1(req.body.password) }, (err, resp) => {
        if (resp.length > 0) {
            sess = req.session;
            sess.user = resp[0];
            res.status(200).redirect('/profile');
        } else {
            res.send('invalide input');
        }
    });
});

//Middleware Function
function isAuthenticated(req, res, next) {
    if (req.session.user)
        return next();
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.session.user) {
        if (req.session.user.admin == true) {
            return next();
        }
    }
    res.redirect('/login');
}

app.listen(4242);