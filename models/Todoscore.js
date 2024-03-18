const mongoose = require('mongoose');
const {Schema} = mongoose

const TodosscoreSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    score:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('todoscore', TodosscoreSchema);   

