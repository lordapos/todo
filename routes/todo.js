const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

// Get to-do list
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.status(201).json({todos})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Add to-do item
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            done: false,
        })
        res.status(201).json({todo})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Update to-do item
router.put('/:id', (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Delete to-do item
router.delete('/:id', (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})


module.exports = router