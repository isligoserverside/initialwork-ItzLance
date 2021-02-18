const express = require('express')
const personData = require('./routes/personData');
const app = express()
const port = 3000

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/personlist', require('./routes/personlist'));

app.use('/about', require('./routes/about'));

app.get('/', (req,res) => {
    res.type('text/plain');
    res.send('Covid Holiday Tour');
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