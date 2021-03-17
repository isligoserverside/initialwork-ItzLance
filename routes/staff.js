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
router.post('/addnew', (req, res) => {
   console.log("Data received from a  post");
   console.table(req.body);
   req.session.flash = 
   { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" + req.body.firstname + " " + req.body.surname + "</strong> has been added"}
   res.redirect(303, '/staff')
});

// router.get('/personadded', (req,res)=>{Z
//    res.render('personadded')
// });

router.get('/personadded', (req, res) => {

   if (req.session.staffdata) {
       var newName = req.session.staffdata.name;
   }else {
       var newName = "";
   }
   res.render('personadded', { name: newName })
});

router.get('/:name',(req,res)=>{
   let name = req.params.name;
   if(personData[name]){
      res.render('person',{person: personData[name]});
   }else{
      res.type('text/plain');
      res.send('Server 404 Error');
   }
});
module.exports = router;