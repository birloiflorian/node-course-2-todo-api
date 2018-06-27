// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//create object id on the fly
var obj = new ObjectID();
console.log(obj);

// var user = {name: 'Florian', age: 26 };
// //object destructuring
// var {name} = user;
// console.log(name);

//the database is created by giving a name
//mongo is creating the database once you start adding data into it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if( err ){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server...');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         console.log("Unable to insert todo", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //insert into Users (name, age, location)
    db.collection('Users').insertOne({
        name: 'Florian',
        age: 26,
        location: 'Bucharest, Romania'
    }, (err, result) => {
        if(err){
            console.log("Unable to insert user", err);
        }

        //get timestamp from onject id - this way you will know when the object is created
        console.log(result.ops[0]._id.getTimestamp());
    });

    //closes the connection with MongoDB server
    db.close();
});

//OBS: _id -> 12 bytes value, first 4 are the timestamp
            // + 3 machine identifier
            // + 2 processid
            // + 3 random value
