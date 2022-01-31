const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create an instance of schema object
const itemSchema = new Schema({
    //object literals here
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', itemSchema);