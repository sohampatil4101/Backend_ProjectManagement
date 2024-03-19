const express = require('express')
const meet = require('../models/Meet')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';


    // route for updateing user profile
    router.post('/createmeet', fetchuser, async (req, res) =>{

        try {

            const user = await meet.create({
                user: req.user.id,
                project: req.body.project,
                meetid : req.body.meetid,
                meetagenda : req.body.meetagenda,
                meetdate : req.body.meetdate,
                meettime : req.body.meettime,
            })
            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })
    
    // update meet
    router.post('/updatemeet', fetchuser, async (req, res) =>{
        
        const milestonepairs = req.body.attendance.split(",");
        const attendancedata = {};
        milestonepairs.forEach(pairs => {
            const keyValue = pairs.split(":");
            attendancedata[keyValue[0]] = keyValue[1];
        });


        try {
            const existingdata = await meet.findOne({ _id: req.body.meet });
            existingdata.meetmom = req.body.meetmom;
            existingdata.attendance = attendancedata;
            await existingdata.save();  
            console.log(attendancedata)

            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })
    
    // get project data
    router.post('/getmeetdetails', fetchuser, async(req, res) =>{
        try {
            const notes = await meet.find({project: req.body.project});
            res.json(notes)
        } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
        }
    })
    
    
module.exports = router