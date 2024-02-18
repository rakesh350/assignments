const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ username });
    if (adminExists) return res.status(200).json({ message: 'Admin already exists.'});
    await Admin.create({ username, password})
    res.json({ message: 'Admin created successfully'})    
});

router.post('/courses', adminMiddleware, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const imageLink =  req.body.imageLink;

    const newCourse = new Course({
        title,
        description,
        price,
        imageLink
    });

    newCourse.save().then((course) => {
        if (!course) return res.status(400).json({ message: 'Failed to add course. Please try again'})
        return res.status(201).json({ message: 'Course created successfully', courseId: course._id})
    });

});

router.get('/courses', adminMiddleware,  async (req, res) => {
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })    
});

module.exports = router;