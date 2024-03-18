const mongoose = require('mongoose');
const {Schema} = mongoose

const ReviewSchema = new mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    review:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('review', ReviewSchema);   

