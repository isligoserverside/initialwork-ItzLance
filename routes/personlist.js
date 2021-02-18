const express = require('express');
const router = express.Router();
const personData = require('./personData');


//Home Route
router.get('/',(req,res)=>{
let name = req.params.name;
  res.render('personlist',{person: personData});
  });

router.get('/:name',(req,res)=>{
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