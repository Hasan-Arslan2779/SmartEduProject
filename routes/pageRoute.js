const express = require('express');

const pageController = require('../controllers/pageController');

const router = express.Router();

// Ansayfa
router.route('/').get(pageController.getIndexPage);
// About
router.route('/about').get(pageController.getAboutPage);
// Login
router.route('/login').get(pageController.getLoginPage);
// Register
router.route('/register').get(pageController.getRegisterPage);

module.exports = router;
