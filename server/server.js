
var express = require('express');
//get json and convert in an object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

//give this middleware to express
app.use(bodyParser.json());

//configure post route
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//configure get request
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        //more flexible to use object
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});































/**
 *
 *
 *      Testing stuff
 *
 */

// //add first todo
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// //add second todo
// var secondTodo = new Todo({
//     text: 'Edit this video'
// });

// //save to db
// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save Todo');
// });

// //challange new todo with all params
// //save to db
// secondTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save Todo', err);
// });



// var newUser = new User({
//     email: 'birloiflorian@gmail.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved User', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// });
