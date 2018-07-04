//To be completed
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "5b3a9127f343628071146e6b";

if(!ObjectID.isValid(id)){
    console.log("id not valid");
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log("Id not found");
    }
    console.log('Todo by Id', todo);
}).catch(err => {
    console.log(e);
});

/**
 * challange
 */

User.findById(id).then((user) => {
    if(!user){
        return console.log("unable to find user");
    }

    console.log(JSON.stringify(user,undefined, 2));
}, (e) => {
    console.log(e);
})
