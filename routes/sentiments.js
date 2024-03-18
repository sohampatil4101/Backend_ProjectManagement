const express = require('express')
const todo = require('../models/Todo')
const sentiments = require('../models/sentiments')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// post todo
router.post('/postsentiments', fetchuser, async (req, res) =>{
        
    try {
        console.log(req.user.id)
        const user = await sentiments.create({
            user: req.user.id,
            sentiments : req.body.sentiments,
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
router.get('/fetchmysentiments', fetchuser, async(req, res) =>{
    try {
        const notes = await sentiments.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})




module.exports = router
