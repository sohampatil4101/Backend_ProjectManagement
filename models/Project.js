const mongoose = require('mongoose');
const {Schema} = mongoose

const ProjectSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    projectname:{
        type: String,
        required: true
    },
    projecttype:{
        type: String,
        required: true
    },
    team:{
        type: Object,
        required: true
    },
    projectidea:{
        type: String,
        required: true
    },
    projectfeatures:{
        type: [String],
        required: true
    },
    projectdescription:{
        type: String,
        required: true
    },
    projectgoals: {
        type: String, 
        required: true
      },
    projectoutcomes: {
        type: String, 
        required: true
      },
    isprojectfunded: {
        type: String, 
        required: true
      },
      projectfundedby: {
        type: String, 
        required: false
      },
    projectstack: {
        type: String, 
        required: true
      },
    totalmilestones: {
        type: Number, 
        required: true
      },
    milestone: {
        type: Object, 
        required: true
      },
    deadlineofproject: {
        type: String, 
        required: true
      },
    flowchart: {
        type: String, 
        required: true
      },
    architecture: {
        type: String, 
        required: true
      },
    githubrepo: {
        type: String, 
        required: true
      },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('project', ProjectSchema);   

