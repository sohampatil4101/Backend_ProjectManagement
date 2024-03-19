const express = require('express')
const task = require('../models/Task')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';


    // route for updateing user profile
    router.post('/createtask', fetchuser, async (req, res) =>{

        try {

            const user = await task.create({
                user: req.user.id,
                teammember: req.body.teammember,
                project: req.body.project,
                task : req.body.task,
                deadline : req.body.deadline
            })
            success = true
            res.json({success}) 
    }    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    })
    
    // delete task
    
// Route to delete a todo
router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        const todoId = req.params.id;
        const todoToDelete = await task.findOne({ _id: todoId, user: req.user.id });
        if (!todoToDelete) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await todo.deleteOne({ _id: todoId });
        res.json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred');
    }
});


    
    // get my tasks
    router.post('/getmytask', fetchuser, async(req, res) =>{
        try {
            const notes = await task.find({teammember: req.body.teammember});
            res.json(notes)
        } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
        }
    })
    // get all tasks
    router.post('/getalltask', fetchuser, async(req, res) =>{
        try {
            const notes = await task.find({project: req.body.project});
            res.json(notes)
        } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
        }
    })
    
    
module.exports = router