const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require("cors");

// const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27042/mern-pool', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connection successful');
});

app.disable('x-powered-by');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const userModel = require('./models/userModel');

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/blog', require('./routes/blog.routes'));

// app.get('/:login', function (req, res) {
//     userModel.findOne({ 'login': req.params.login }, (err, resp) => {
//         err ? res.status(400).json('Error: ' + err) : res.status(200).json(resp);
//     });
// });

// app.put('/api/stuff/:id', (req, res, next) => {
//     billetModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// app.delete('/api/stuff/:id', (req, res, next) => {
//     billetModel.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));