const express = require('express');
const router = express.Router();

router.get('/contact', (req,res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

module.exports = router;