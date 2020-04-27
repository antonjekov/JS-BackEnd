const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
        
    } ,
    difficultyLevel:{
        type: String,
        required: true
    } ,
    imageURL: {
        type: String,
        required: true,
        
    },
    creatorId: {
        type: String,
        required:true
    },
    accessories: [{type: mongoose.Types.ObjectId, ref:'Accessories'}]
})

module.exports = mongoose.model('Cube', cubeSchema);