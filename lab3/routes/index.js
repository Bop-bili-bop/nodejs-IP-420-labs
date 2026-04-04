const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    message: 'Welcome to Lab 3'
  });
});

// Example route
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page'
  });
});

module.exports = router;
