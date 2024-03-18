const mongoose = require('mongoose');
const {Schema} = mongoose

const OldMediSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    deases:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true,
    },
    consultation:{  //yes or no
        type: String,
        required: true
    },
    isrecovered:{  
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('oldmedical_info', OldMediSchema);   

