const mongoose = require('mongoose');
const {Schema} = mongoose

const FileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    project:{
        type: String,
    },  
    // project:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'project',
    // },  
    file: {
        type: String, 
        required: true
      },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('file', FileSchema);   

