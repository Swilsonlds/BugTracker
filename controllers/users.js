const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const lists = await mongodb
            .getDb()
            .db('BugTracker')
            .collection('users')
            .find()
            .toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  };
   
  const getSingle = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid bug report id to find a bug report.');
      }
      const userId = new ObjectId(req.params.id);
      const lists = await mongodb
        .getDb()
        .db('BugTracker')
        .collection('users')
        .find({ _id: userId})
        .toArray();
        
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  };
  
  const createUser = async (req, res) => {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeID: req.body.employeeID
      };
  
      const response = await mongodb.getDb().db('BugTracker').collection('users').insertOne(user);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
  };
  
  const updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid bug report id to find a bug report.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeID: req.body.employeeID
    };

    const response = await mongodb
      .getDb()
      .db('BugTracker')
      .collection('users')
      .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the bug report.');
    }
  };
  
  const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a bug report.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('BugTracker').collection('users').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the bug report.');
    }
  };
  
  module.exports = {
      getAll,
      getSingle,
      createUser,
      updateUser,
      deleteUser
  }
