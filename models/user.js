const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {bcryptSaltRounds} = require('../app-config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.methods.matchPassword = function(password){
   return bcrypt.compare(password, this.password);
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, bcryptSaltRounds, (err, hash)=> {
            if (err){
                next(err);
                return;
            } 
            this.password=hash;
            next();
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);