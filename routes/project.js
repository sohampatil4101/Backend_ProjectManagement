const express = require('express')
const project = require('../models/Project')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';

    // file upload logic 
    
    const path = require('path')
    const multer  = require('multer')
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb) {
            let ext = path.extname(file.originalname)
            cb(null, Date.now() + ext)
        }
    })
    
    const upload = multer({ storage: storage })
    // app.use('/uploads', express.static())



    // route for updateing user profile
    router.post('/addproject', upload.single('resume'), fetchuser, async (req, res) =>{

        // console.log("soham is great",req.body, req.file)
        // console.log(Array.from(req.body.projectfeatures))
        try {
            const projectfeaturedata = req.body.projectfeatures.split(", ");


            // const str = "abc:soha, bjsc:mzkjb";
            const teampairs = req.body.team.split(",");
            const teamdata = {};
            teampairs.forEach(pair => {
                const keyValue = pair.split(":");
                teamdata[keyValue[0]] = keyValue[1];
            });

            // console.log(teamdata);

            const milestonepairs = req.body.attendance.split(",");
            const milestonedata = {};
            milestonepairs.forEach(pairs => {
                const keyValue = pairs.split(":");
                milestonedata[keyValue[0]] = keyValue[1];
            });

            // console.log(milestonedata);

            const user = await project.create({
                user: req.user.id,
                projectname : req.body.projectname,
                projecttype : req.body.projecttype,
                team : teamdata,
                projectidea : req.body.projectidea,
                projectfeatures : projectfeaturedata,
                projectdescription : req.body.projectdescription,
                projectgoals : req.body.projectgoals,
                projectoutcomes : req.body.projectoutcomes,
                isprojectfunded : req.body.isprojectfunded,
                projectfundedby : req.body.projectfundedby,
                projectstack : req.body.projectstack,
                totalmilestones : req.body.totalmilestones,
                milestone : milestonedata,
                deadlineofproject : req.body.deadlineofproject,
                flowchart : req.body.flowchart,
                architecture : req.body.architecture,
                githubrepo : req.body.githubrepo
            })
            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })
    
    // get project data
    router.get('/getmyproject', fetchuser, async(req, res) =>{
        try {
            const notes = await project.find({user: req.user.id});
            res.json(notes)
        } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
        }
    })
    
    
module.exports = router