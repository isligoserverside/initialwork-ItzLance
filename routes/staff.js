const express = require('express');
const router = express.Router();
const personData = require('../lib/personData');

//Home Route
router.get('/',(req,res)=>{
let name = req.params.name;
  res.render('personlist',{person: personData});
  });

router.get('/addnew', (req, res) => {
   let fname = req.query.firstname;
   let sname = req.query.surname;
   let selec = req.query.selection;
   let rad = req.query.radio;
   console.log(`Data Entered ${fname} ${sname} ${selec} ${rad}`);
   let data = {}

   res.render('personform', {firstname: fname, surname: sname, selection: selec, radio: rad });
});
router.get('/personadded', (req,res)=>{
   res.render('personadded')
});
router.post('/addnew', (req, res) => {
   console.log("Data send via post");
   console.table(req.body);
   res.redirect(303, 'personadded',)
});


router.get('/',(req,res)=>{
  let name = req.params.name;
   if(personData[name]){
      res.render('person',{person: personData[name]});
      console.log(`${name}`);
   }else{
      res.type('text/plain');
      res.send('Server 404 Error');
   }
});

module.exports = router;