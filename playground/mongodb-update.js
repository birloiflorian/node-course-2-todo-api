// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if( err ){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server...');

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b33e7a0edaa00092d5f76b8")
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    //challange
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b33da9d67101d0675387fb3")
    },{
        $set: {
            name: 'Florian'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});
