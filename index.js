const express = require('express')
const people = require('./people')
const app = express()
const port = 3000

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

let personData = {"ednaMode":{ "name": "Edna Mode",
        "dob": "05/11/2004",
        "movie": "The Incredibles",
        "imageurl": "/images/edna.jpg",
        "height": "129cm",
        "hobbies": ["Fashion", "Superheros", "Design"]},

"babyYoda" : { "name": "Baby Yoda",
        "dob": "12/11/2019",
        "movie": "Star Wars Mandalorian",
        "imageurl": "/images/babyYoda.jpg",
        "height": "60cm",
        "hobbies": ["Telekinesis", "Been Cute", "Macaroons"]},

"dipperPines" : { "name": "Dipper",
        "dob": "01/01/2012",
        "movie": "Gravity Falls",
        "imageurl": "/images/dipper.png",
        "height": "152cm",
        "hobbies": ["Exploring", "Mysteries", "Sleeping"]},

"baymax": {"name": "Beymax",
        "dob": "01/01/2015",
        "movie":"Big Hero Six",
        "imageurl": "/images/baymax.jpg",
        "height": "188cm",
        "hobbies": ["Medical Assistance", "Hugs", "SuperHero"]},

"fluffo": {"name": "Fluffo",
           "dob": "01/01/2019",
           "imageurl": "/images/fluffo.jpg",
           "height": "15cm",
           "hobbies": ["sleeping", "eating","lurking"]}
};

app.get('/personlist',(req,res)=>{
    res.render('personlist',{person:personData})
    });
         
app.get('/personlist/:name',(req,res)=>{
    let name = req.params.name;
     if(personData[name]){
        res.render('person',{person: personData[name]});
     }else{
        res.type('text/plain');
        res.send('Server 404 Error');
     }
});

app.get('/about', (req,res) => res.render('about'));

app.get('/', (req,res) => {
    res.type('text/plain');
    res.send('Covid Holiday Tour');
});

app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About Our Holiday');
});

app.get('/contact', (req,res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(port, () => console.log(`listening on port ${port}`));