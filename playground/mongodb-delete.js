// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if( err ){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server...');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Go Home'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: "Something to do"}).then((resutl) => {
    //     console.log(resutl);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     //this will get the deleted value as well
    //     console.log(result);
    // });

    //look for duplicates and remove
    // db.collection('Users').deleteMany({name: 'Florian'}).then((result) => {
    //     console.log(result);
    // });

    //delete one by id
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b33db52e86fe3068b140b1e")}).then((result) => {
        //this will get the deleted value as well
        console.log(result);
    });

    // db.close();
});
