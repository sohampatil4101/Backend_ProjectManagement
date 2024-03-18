const mongoose = require('mongoose');
const {Schema} = mongoose

const AssesmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('assesment', AssesmentSchema);   

