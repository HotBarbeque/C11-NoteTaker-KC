//Imports router and path
const router = require('express').Router();
const path = require('path');

//Defines route handler for GET
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//exports router to be used elsewhere in app
module.exports = router;