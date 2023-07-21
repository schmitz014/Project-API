const router = require('express').Router();
const Person = require('../models/Person');

// Create a new person
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: 'Name is required!' });
    return;
  }else if (!salary) {
    res.status(422).json({ error: 'Salary is required!' });
    return;
   }else if (!approved){
    res.status(422).json({ error: 'Approved is required!' });
    return;
   }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ message: 'Person created!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json({ people });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a person by ID
router.get('/:id', async (req, res) => {
 const { id } = req.params;

 try {
  const person = await Person.findOne({_id: id});
  if(!person){
   res.status(422).json({ error: 'Person not found!' });
   return;
  }
  res.status(200).json(person);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});

module.exports = router;
