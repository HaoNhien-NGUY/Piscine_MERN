const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const userModel = require('../models/userModel');

router.get('/:login', function (req, res) {
    userModel.findOne({ login: req.params.login }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        }
        else if (user) {
            res.status(200).json({
                login: user.login,
                email: user.email,
                id: user.id
            });
        } else {
            res.status(404).json({message: 'User not found'});
        }
    });
});

router.get('/', function (req, res) {
    userModel.find().then(resp => {
        res.status(200).json({
            users: resp
        })
    })
});

router.delete('/delete', verifyToken, function(req, res) {
    userModel.findOneAndDelete(req.userId, (err, resp) => {
        return res.status(202);
    })
})

module.exports = router;