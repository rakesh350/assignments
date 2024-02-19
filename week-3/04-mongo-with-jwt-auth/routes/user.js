const { Router } = require("express");
const { User, Course } = require('../db');
const jwt = require('jsonwebtoken');
const router = Router();
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) return res.status(409).json({ message: 'User already exists!' });
    await User.create({ username, password });
    res.json({ message: 'User account successfully' });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username, password });
    if (!userExist) return res.status(403).json({ message: 'Invalid Credentials' });
    const jwtToken = jwt.sign({ username }, JWT_SECRET);
    return res.status(200).json({ token: jwtToken });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    return res.json({ courses: courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const course = await Course.findOne({ _id: courseId });
    if(!course) return res.status(404).json({ message: 'Invalid course Id' });
    await User.updateOne({ username: req.user.username }, { '$push': {
        coursePurchased: course._id
    } });
    res.json({ message: 'Course purchased succefully' });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {    
    const user = await User.findOne({ username: req.user.username });
    const purchasedCourses = await Course.find({ _id: {
        '$in': user.coursePurchased
    } });

    return res.json({
        courses: purchasedCourses
    });
});

module.exports = router