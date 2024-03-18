const mongoose = require('mongoose');
const {Schema} = mongoose

const UserprofileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    fullname:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    mobilno:{
        type: Number,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    typeofuser:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    resume: {
        type: String, 
        required: true
      },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('userprofile', UserprofileSchema);   

