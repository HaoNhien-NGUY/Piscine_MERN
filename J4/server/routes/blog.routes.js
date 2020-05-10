const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');

router.get('/', function (req, res) {
    postModel.find().populate("author").then(resp => {
        res.status(200).json({
            post: resp
        })
    })
});

router.get('/:id', function (req, res) {
    postModel.find({ author: req.params.id }).populate("author").then(resp => {
        res.status(200).json({
            post: resp
        })
    })
});

router.get('/details/:id', function (req, res) {
    postModel.findById(req.params.id).populate("author").then(resp => {
        res.status(200).json({
            post: resp
        })
    })
})

router.post('/create', async function (req, res) {
    const post = new postModel({
        title: 'Help me',
        content: 'I\'m dying',
        author: '5eb2f8ec1c32824c63f2f6f9'
    });
    post.save({}, (err, resp) => {
        if (err) {
            return res.status(400).json({ err });
        } else {
            return res.status(201).json({ message: 'Post created', resp: resp });
        }
    });
});

router.post('/comment/create/:id', verifyToken, function (req, res) {
    console.log(req.body.content);
    const comment = new commentModel({
        author: req.userId,
        authorname: req.userLogin,
        content: req.body.content
    });
    comment.save({}, (err, resp) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ err });
        } else {
            //add comment in post
            postModel.findByIdAndUpdate(
                req.params.id,
                { $push: { comments: resp._id } },
                { new: true, useFindAndModify: false },
                (err, resp) => {
                    if (err) {
                        return res.status(400).json({ err });
                    } else {
                        return res.status(201).json({ message: 'Comment created' });
                    }

                });
        }
    });
});

module.exports = router;