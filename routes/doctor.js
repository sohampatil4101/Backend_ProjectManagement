const express = require('express')
const Doctor = require('../models/Doctor')
const docinfo = require('../models/doctorinfo/docinfo')
const appoinment = require('../models/appoinment/Appoinment')
const review = require('../models/review/review')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';

const validate = [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 characters and alphanumeric').isLength({min:5}).isAlphanumeric(),
]


// Route 1 to create user
router.post('/', validate, async (req, res) =>{
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({success, error:"Enter a strong password", errors: errors.array()})
    }
    
    try {
            // check wheather user exist!!
            let doctor = await Doctor.findOne({email: req.body.email});
            if(doctor){
        return res.status(400).json({success, error: "sorry doctor with these email exist"})
    }
    else{
        const salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(req.body.password, salt)
        doctor = await Doctor.create({
            name : req.body.name,
            email : req.body.email,
            password : hashpassword
        })
        const data = {
            doctor:{
                id: doctor.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, jwtdata})
    }
    
}    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    
    
})


// Authentication a user and his password
// Route 2 to authenticate user

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password cannont be blank').exists()], 
    async (req, res) =>{
        let success = false
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors: errors.array()})
        }

        const{email, password} = req.body;
        try {
            const user = await Doctor.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Please try to login with correct cridentials"})
            }
            const passwordcompare = await bcrypt.compare(password, user.password);
            if(!passwordcompare){
                return res.status(400).json({success, error: "Please try to login with correct cridentials"})
            }
            
        const data = {
            user:{
                id: user.id
            }
        }
        const jwtdata = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, jwtdata})
        } 
        
           
        catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured")
    }
    }
    )


    // Route to update doctor info
  router.post('/doctorinfo', fetchuser, async (req, res) =>{
        
    try {

        const user = await docinfo.create({
            doctor: req.user.id,
            uniqueid : req.body.uniqueid,
            specialization : req.body.specialization,
            yrofgraduation : req.body.yrofgraduation,
            experience : req.body.experience,
            type : req.body.type,
            location : req.body.location,
            about : req.body.about,
            fees : req.body.fees,
            govno : req.body.govno,
            number : req.body.number
        })
        
        success = true
        res.json({success})
    
    
}    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    
    
})




// Route to book appoinment
   router.post('/bookappoinment', fetchuser, async (req, res) =>{
        
    try {

        const user = await appoinment.create({
            user: req.user.id,
            doctor: req.body.doctor,
            date : req.body.date,
            time : req.body.time,
            customschedule : req.body.customschedule,
            package : req.body.package,
            duration : req.body.duration,
            problem : req.body.problem,
        })
        
        success = true
        res.json({success})
    
    
}    

catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}


})


// route for doc to fetch all his appoinment
router.get('/fetchallappoinments', fetchuser, async(req, res) =>{
    try {
        const notes = await appoinment.find({doctor: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})


// route for doc to fetch all doctors
router.get('/fetchalldoctors', fetchuser, async(req, res) =>{
    try {
        const notes = await docinfo.find();
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})

// route for doc to fetch all doctors
router.post('/fetchdoctor', fetchuser, async(req, res) =>{
    try {
        const notes = await docinfo.find({doctor:req.body.doctor});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})



// Route to post review
   router.post('/postreview', fetchuser, async (req, res) =>{
        
    try {

        const user = await review.create({
            user: req.user.id,
            doctor: req.body.doctor,
            review : req.body.review,
            rating : req.body.rating
        })
        
        success = true
        res.json({success})
    
    
}    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    
    
})


router.get('/getreviews', fetchuser, async(req, res) =>{
    try {
        const notes = await review.find({doctor: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})







    // Route 3 to get user details


    router.post('/getuser', fetchuser,async (req, res) =>{
        try {
             userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } 
    
        catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")
        }
        
    })




module.exports = router