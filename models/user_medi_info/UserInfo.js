const mongoose = require('mongoose');
const {Schema} = mongoose

const UserInfoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    bloodgroup:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('user_info', UserInfoSchema);   

