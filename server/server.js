
require('./config/config');

const _ = require('lodash');

const express = require('express');
//get json and convert in an object
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//get new models

var {UserRoom} = require('./models/room-res/room-user');
var {Room} = require('./models/room-res/room');
var {Reservation} = require('./models/room-res/reservation');


var app = express();
var port = process.env.PORT;

//give this middleware to expressb
app.use(bodyParser.json());

app.post('/user', (req, res) => {
    var user = new User({
        email: req.body.username,
        password: req.body.password
    });

    user.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.post('/login', (req, res) => {
    User.find({ email: req.body.username, password: req.body.password}).then((doc) => {
        if(doc.length <= 0){
            return res.status(404).send({message: 'User not found'});
        }

        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.get('/user', (req, res) => {
    User.find().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

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
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //pick only what you want to update
    var body = _.pick(req.body, ['text', 'completed']);

    //validate the id => not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})



/**
 *  API for Room Reservation - Gerogiana Paler
 */

//get rooms
app.get('/room', (req, res) => {
    Room.find().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//get users
app.get('/appusers', (req, res) => {
    UserRoom.find().then((doc) => {
        //init the users if there aren't any
        if(doc.length == 0){
            initUsers().then((results) => {
                res.send(results);
            }).catch((err) => {
                res.status(400).send(err);
            });
        }else{
            res.send(doc);
        }
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//get reservations
app.get('/reservation', (req, res) => {
    Reservation.find().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//add reservation
app.post('/reservation', (req, res) => {
    var res = new Reservation({
        name: req.body.name,
        roomId: req.body.roomId,
        userId: req.body.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    res.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//add room
app.post('/room', (req, res) => {
    var res = new Room({
        name: req.body.name,
        floor: req.body.floor,
        building: req.body.building
    });

    res.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete('/room/:id', (req, res) => {
    //get the id
    var id = req.params.id;

    //validate the id => not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    // remove todo by id
    Room.findByIdAndRemove(id).then((room) => {
        //success
        //if no doc => 404
        if(!room){
            return res.status(404).send();
        }

        //if doc, send back doc with 100
        res.send({room});
    }).catch((e) => {
        // error -> 400 empty body
        res.status(400).send();
    });
});

app.patch('/room/:id', (req, res) => {
    var id = req.params.id;
    //pick only what you want to update
    var body = _.pick(req.body, ['name', 'floor', 'building']);

    //validate the id => not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Room.findByIdAndUpdate(id, {$set: body}, {new: true}).then((room) => {
        if(!room){
            return res.status(404).send();
        }

        res.send({room});
    }).catch((e) => {
        res.status(400).send();
    })
});

//init users
function initUsers() {
    var users = [
        {
            username: 'florian',
            password: 'parola12',
            email: 'florian@email.com',
            type: 'admin'
        },
        {
            username: 'adriana',
            password: 'parola12',
            email: 'adriana@email.com',
            type: 'normal'
        },
        {
            username: 'georgiana',
            password: 'parola12',
            email: 'adriana@email.com',
            type: 'normal'
        }
    ]

    return Promise.all(
        users.map(user => {
            var curr = new UserRoom(user);
            return user.save();
        })
    );
}


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


/**
 *  API for Room Reservation - Gerogiana Paler
 */
