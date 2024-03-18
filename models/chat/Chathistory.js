const mongoose = require('mongoose');
const {Schema} = mongoose

const ChatshistorySchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
});
module.exports = mongoose.model('chathistory', ChatshistorySchema);   

