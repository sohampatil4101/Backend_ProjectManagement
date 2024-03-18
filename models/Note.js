const mongoose = require('mongoose');
const {Schema} = mongoose

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    note:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('note', NotesSchema);   

