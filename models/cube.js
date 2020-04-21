const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description : String,
    difficultyLevel: String,
    imageURL: String
})

module.exports = mongoose.model('Cube', cubeSchema);