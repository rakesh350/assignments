const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://otter_dbuser:Mahi%40007@otter-cluster.wxor4d5.mongodb.net/course_selling_apps');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    coursePurchased: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}