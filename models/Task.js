const mongoose = require('mongoose');
const {Schema} = mongoose

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    teammember:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },  
    task:{
        type: String,
        required: true
    },
    deadline:{
        type: String,
        required: true
    }

});
module.exports = mongoose.model('task', TaskSchema);   

