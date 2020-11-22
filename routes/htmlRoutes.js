// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path'); // get Express path
var router = require('express').Router(); // get Express router

// ===============================================================================
// ROUTING
// ===============================================================================
// user clicked on button to go to notes page
router.get('/notes', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // I put this in because Heroku documentation says Heroku requires it
  router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // default guy
  router.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  

  module.exports = router;
  