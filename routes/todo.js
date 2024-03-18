const express = require('express')
const todo = require('../models/Todo')
const todoscore = require('../models/Todoscore')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// post todo
router.post('/posttodo', fetchuser, async (req, res) =>{
        
    try {
        console.log(req.user.id)
        const user = await todo.create({
            user: req.user.id,
            todo : req.body.todo,
            priority : req.body.priority
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
router.get('/fetchmytodo', fetchuser, async(req, res) =>{
    try {
        const notes = await todo.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})


// Route to delete a todo
router.delete('/deletetodo/:id', fetchuser, async (req, res) => {
    try {
        // Extract todo ID from request parameters
        const todoId = req.params.id;
        
        // Find the todo by ID and ensure it belongs to the logged-in user
        const todoToDelete = await todo.findOne({ _id: todoId, user: req.user.id });

        // If todo is not found or doesn't belong to the user, return an error
        if (!todoToDelete) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Delete the todo
        await todo.deleteOne({ _id: todoId });

        // Return success response
        res.json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred');
    }
});



// Route to add score
router.post('/posttodosscore', fetchuser, async (req, res) => {
    try {
        console.log(req.user.id);
        const existingScore = await todoscore.findOne({ user: req.user.id });

        if (!existingScore) {
            // If no score entry exists for the user, create a new one
            const newScore = new todoscore({
                user: req.user.id,
                score: req.body.score
            });
            await newScore.save();
        } else {
            // If a score entry exists, update the score by adding the provided score
            existingScore.score += req.body.score;
            await existingScore.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// route to get the score
router.get('/fetchmytodoscore', fetchuser, async(req, res) =>{
    try {
        const notes = await todoscore.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})




module.exports = router
