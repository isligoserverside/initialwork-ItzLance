const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//app.use(cookieParser());
const logger = (req,res,next)=>{
    console.log('Logged');
    next();
}
app.use(logger);

app.use(cookieParser("spicy memes"));

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