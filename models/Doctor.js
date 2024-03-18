const mongoose = require('mongoose');
const Schema = mongoose
const DoctorSchema = new mongoose.Schema({

    
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    number:{
        type: Number,
        required: true
    },
    charges:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});

const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor