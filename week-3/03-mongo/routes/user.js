const { Router } = require("express");
const { User, Course } = require('../db');
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user already exists
    const userExist = await User.findOne({ username: username });
    console.log(userExist);
    if(userExist) return res.status(200).json({ message: "User already exist!" });
    
    // Add user to the database
    await User.create({ username, password });
    res.json({ message: 'User created successfully' });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses: courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;

    await User.updateOne({ username }, { '$push': { coursePurchased: courseId}});
    res.json({ message: 'Course purchased successfully'})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user  = await User.findOne({ username });
    const userCourses = await Course.find({
        _id: {$in: user.coursePurchased}
    });

    res.json({
        purchasedCourses: userCourses
    })
});

module.exports = router