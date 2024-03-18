const mongoose = require('mongoose');
const {Schema} = mongoose

const ChatsSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    message:{
        type: String,
        required: true
    },
    time: {
        type: String,
        default: function() {
            // Generate current time in "HH:MM:SS" format
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentTime.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('chat', ChatsSchema);   

