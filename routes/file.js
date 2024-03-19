const express = require('express')
const file = require('../models/File')
const link = require('../models/Link')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';


// add file logic
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



    // route for adding file
    router.post('/postfile', upload.single('file'), fetchuser, async (req, res) =>{

        console.log("soham is great",req.body, req.file)
        try {
            console.log(req.user.id)
            const user = await file.create({
                user: req.user.id,
                project : req.body.project,
                file : req.file.path
            })
            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })

    // add links
    router.post('/postfile', fetchuser, async (req, res) =>{

        try {
            console.log(req.user.id)
            const user = await link.create({
                user: req.user.id,
                project : req.body.project,
                link : req.body.link
            })
            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })
    


module.exports = router