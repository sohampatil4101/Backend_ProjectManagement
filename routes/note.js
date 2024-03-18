const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const note = require('../models/Note')
const {body, validationResult} = require('express-validator')




// Route 1: fetching all notes of logged in user
router.get('/fetchallnotes', fetchuser, async(req, res) =>{
    try {
        const notes = await note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})



// Route 2: Add new notes after logged in
router.post('/addnote', fetchuser, async (req, res) =>{
    try {
        console.log(req.body)
        console.log('xns')
        const user = await note.create({
            user: req.user.id,
            note : req.body.note
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
router.get('/fetmynotes', fetchuser, async(req, res) =>{
    try {
        const notes = await note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})



module.exports = router