const express = require('express');
const router = express.Router();

router.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Our Holiday');
});
router.get('/', (req,res) => res.render('about'));

module.exports = router;