const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const secret = 'haosecret';

const userModel = require('../models/userModel');

router.post('/login', function (req, res) {
    if (!req.body.login || !req.body.password) {
        return res.status(401).send('invalid login/password');
    }
    userModel.findOne({ login: req.body.login, password: sha1(req.body.password) }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        }
        else if (user) {
            res.status(200).json({
                userId: user._id,
                login: user.login,
                email: user.email,
                accessToken: jwt.sign(
                    {
                        userId: user._id,
                        login: user.login
                    },
                    secret,
                    { expiresIn: '7d' }
                )
            })
        } else {
            res.status(401).json({ message: 'Invalid login/password' });
        }
    });
});

router.post('/register', async function (req, res) {
    if (req.body.password === req.body.confirmpw) {
        const loginFound = await userModel.findOne({login: req.body.login}).exec();
        if(loginFound) return res.status(400).json({ message: 'Login already taken'});

        const emailFound = await userModel.findOne({email: req.body.email}).exec();
        if(emailFound) return res.status(400).json({ message: 'Email already taken'});

        const user = new userModel({
            login: req.body.login,
            email: req.body.email,
            password: sha1(req.body.password)
        });
        user.save({}, (err, resp) => {
            if (err) {
                return res.status(400).json({ err });
            } else {
                return res.status(201).json({ message: 'User created' });
            }
        });
    } else {
        return res.status(400).json({ message: 'Password do not match' });
    }
});

module.exports = router;