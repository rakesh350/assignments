const { Router } = require("express");
const jwt = require('jsonwebtoken');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db');
const { JWT_SECRET } = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if admin exists
    const user = await Admin.findOne({ username: username });
    if (user) return res.status(409).json({ message: 'Username already taken' });

    await Admin.create({ username, password});
    return res.json({ message : "Admin account created"});
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    const admin = await Admin.findOne({username, password});
    if(!admin) return res.status(401).json({message:'Invalid Credentials'});
    const jwtToken = jwt.sign({ username }, JWT_SECRET);
    return res.json({ token: jwtToken });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    return res.json({ message: 'Hello'})
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;