const mongoose = require('mongoose');
const {Schema} = mongoose

const MeetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },  
    meetid:{
        type: String,
        required: true
    },
    meetagenda:{
        type: String,
        required: true
    },
    meetmom:{
        type: String,
        required: false
    },
    meetdate:{
        type: String,
        required: true
    },
    meettime:{
        type: String,
        required: true
    },
    attendance: {
        type: Object, 
        required: false
      },


});
module.exports = mongoose.model('meet', MeetSchema);   

