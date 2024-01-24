const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({

    partName : {
        type : String,
        required : true,
    },
    partNumber : {
        type : String,
    },
    brand : {
        type : String,
        required : true,
    },
    count : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
},{timestamps : true})

const Part = new mongoose.model('Part',partSchema)

module.exports = Part