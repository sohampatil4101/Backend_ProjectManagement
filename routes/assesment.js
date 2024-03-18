const express = require('express')
const assesment = require('../models/Assesment')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// post todo
router.post('/postassesment', fetchuser, async (req, res) =>{
        
    try {
        console.log(req.user.id)
        const user = await assesment.create({
            user: req.user.id,
            question : req.body.question,
            answer : req.body.answer
        })
        
        success = true
        res.json({success})
    
    
}    

catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}


})


// fetch todo
router.get('/fetchassesment', fetchuser, async(req, res) =>{
    try {
        const notes = await assesment.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})




module.exports = router
