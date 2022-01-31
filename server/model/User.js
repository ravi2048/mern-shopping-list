const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    register_date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema);