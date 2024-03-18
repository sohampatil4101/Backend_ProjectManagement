const express = require('express')
const blog = require('../models/blog/blog')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// Route to book appoinment
router.post('/postblog', fetchuser, async (req, res) =>{
        
    try {
        console.log(req.user.id)
        const user = await blog.create({
            doctor: req.user.id,
            title : req.body.title,
            description : req.body.description
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
router.get('/fetchallblogs', fetchuser, async(req, res) =>{
    try {
        const notes = await blog.find();
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})

// route for doc to fetch all his appoinment
router.get('/fetchblog', fetchuser, async(req, res) =>{
    try {
        const notes = await blog.find({doctor: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})

module.exports = router
