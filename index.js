// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/mydb";
// const client = new MongoClient(url,{useUnifiedTopology: true});
// client.connect(function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
// });


global.__basedir = __dirname;
const dbConnector = require('./config/db')
dbConnector().then(() => {
    const config = require('./config/config');
    //const cubeModel = require('./models/_cube');
    const app = require('express')();
    require('./config/express')(app);
    require('./config/routes')(app);
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}).catch(console.error);