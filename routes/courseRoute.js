const express = require('express');

const courseController = require('../controllers/courseController');

const router = express.Router();

// Course
router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getOneCourse);

module.exports = router;
