const mongoose = require('mongoose');
const {Schema} = mongoose

const BlogsSchema = new mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },  
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('blog', BlogsSchema);   

