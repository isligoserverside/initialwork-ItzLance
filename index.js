const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {flashMiddleware} = require('./lib/middleware.js');
const app = express()
const port = 3000

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('views/images'));

app.use(session(
    {secret: "una is great!!", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
//app.use(cookieParser());
app.use(cookieParser("una is great!!"));
const logger = (req,res,next)=>{
    console.log('Logged');
    next();
}
app.use(logger);
app.use(flashMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use('/staff', require('./routes/staff'));   //localhost:3000/staff/(name)
app.use('/base', require('./routes/base'));

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