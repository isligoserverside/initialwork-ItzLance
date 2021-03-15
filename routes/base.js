const express = require('express');
const router = express.Router();


router.get('/',  (req, res) => {
    var message = "";
    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on : " + dateLastVisit;
    }
    var currentDate = new Date();
    res.cookie('tracking',currentDate.toDateString(), {signed : true});
    res.render('home', {'message': message});
});

router.get('/contact', (req,res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

router.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Our Holiday');
});
router.get('/', (req,res) => res.render('about'));

module.exports = router;