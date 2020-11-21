// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path');
var router = require('express').Router();

// ===============================================================================
// ROUTING
// ===============================================================================
router.get('/notes', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  router.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  

  module.exports = router;
  