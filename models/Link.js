const mongoose = require('mongoose');
const {Schema} = mongoose

const LinkSchema = new mongoose.Schema({
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
    link: {
        type: String, 
        required: true
      },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('link', LinkSchema);   

