const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
return mongoose.connect(config.dbURL,{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
};