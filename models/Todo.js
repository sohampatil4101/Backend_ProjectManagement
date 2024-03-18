const mongoose = require('mongoose');
const {Schema} = mongoose

const TodosSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    todo:{
        type: String,
        required: true
    },
    priority:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('todo', TodosSchema);   

