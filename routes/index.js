// gather up all the routers, and then send it server.js
const apiRoutes = require('./apiRoutes'); // get apiRoutes router
const htmlRoutes = require('./htmlRoutes'); // get htmlRoutes
const router = require('express').Router(); // get Express router

router.use('/api', apiRoutes); // for API calls
router.use(htmlRoutes); // use html routes

module.exports = router; // send to server.js
