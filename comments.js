// Create web server

// Import Express
const express = require('express');

// Import Express Router
const router = express.Router();

// Import comments model
const Comments = require('../models/comments');

// Import authentication middleware
const auth = require('../middleware/auth');

// Import validation middleware
const validate = require('../middleware/validate');

// Import comments validation schema
const commentsSchema = require('../validation/comments');

// Get all comments
router.get('/', async (req, res) => {
    try {
        // Get all comments
        const comments = await Comments.find();

        // Return comments
        res.json(comments);
    } catch (err) {
        // Return error
        res.status(500).json({ message: err.message });
    }
});

// Get all comments for a post
router.get('/post/:id', async (req, res) => {
    try {
        // Get all comments for a post
        const comments = await Comments.find({ post: req.params.id });

        // Return comments
        res.json(comments);
    } catch (err) {
        // Return error
        res.status(500).json({ message: err.message });
    }
});

// Get all comments for a user
router.get('/user/:id', async (req, res) => {
    try {
        // Get all comments for a user
        const comments = await Comments.find({ user: req.params.id });

        // Return comments
        res.json(comments);
    } catch (err) {
        // Return error
        res.status(500).json({ message: err.message });
    }
});

// Get a comment
router.get('/:id', getComment, (req, res) => {
    // Return comment
    res.json(res.comment);
});

// Create a comment
router.post('/', auth, validate(commentsSchema), async (req, res) => {
    try {
        // Create a comment
        const comment = new Comments({
            text: req.body.text,
            user: req.body.user,
            post: req.body.post,
            created: req.body.created,
            updated: req.body.updated
        });

        // Save comment
        const newComment = await comment.save();

        // Return comment
        res.status(201).json(newComment);
    } catch (err) {
        // Return error
        res.status(400).json({ message: err.message });
    }
});







