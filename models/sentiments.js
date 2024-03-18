const mongoose = require('mongoose');
const {Schema} = mongoose

const sentimentsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    sentiments:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('sentiments', sentimentsSchema);   

