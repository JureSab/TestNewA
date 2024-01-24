const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({

    brand : {
        type : String,
        require : true,
    },
    model : {
        type : String,
        require : true,
    },
    VIN : {
        type : String,
        require : true,
    },
    year : {
        type : Number,
        require : true,
    },
    mileage : {
        type : Number,
        require : true,
    },
    color : {
        type : String,
        require : true,
    },
},{timestamps : true})

const Car = new mongoose.model('Car', carSchema)

module.exports = Car

