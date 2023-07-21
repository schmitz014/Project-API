//API routes
const router = require('express').Router();
const Person = require('../models/Person');

router.use('/', async (req, res) => {

 //Creates a new person

 const {name, salary, approved} = req.body;

 if(!name){
  res.status(422).json({error: 'Name is required!'});
 }

 const person = {
  name,
  salary,
  approved
 }

 try {
  await Person.create(person);
  res.status(201).json({message: 'Person created!'});
 } catch (error) {
  res.status(500).json({message: error.message});
 }}
);

module.exports = router;