
var express = require('express');
//get json and convert in an object
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
var port = process.env.PORT || 3000;

//give this middleware to expressb
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

//fetch a single todo
//GET /todos/id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;

    //validate the id => not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    // remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        //success
        //if no doc => 404
        if(!todo){
            return res.status(404).send();
        }

        //if doc, send back doc with 100
        res.send({todo});
    }).catch((e) => {
        // error -> 400 empty body
        res.status(400).send();
    });
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };






























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
