const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    cubes: [{type: mongoose.Types.ObjectId, ref:'Cube'}]

})

module.exports = mongoose.model('Accessories', accessorySchema);