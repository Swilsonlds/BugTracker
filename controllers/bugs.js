const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
      const lists = await mongodb
          .getDb()
          .db('BugTracker')
          .collection('bugs')
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
    const bugId = new ObjectId(req.params.id);
    const lists = await mongodb
      .getDb()
      .db('BugTracker')
      .collection('bugs')
      .find({ _id: bugId})
      .toArray();
      
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createBug = async (req, res) => {
    const bug = {
      bugTitle: req.body.bugTitle,
      dateDiscovered: req.body.dateDiscovered,
      environment: req.body.environment,
      stepsToReproduce: req.body.stepsToReproduce,
      expectedResult: req.body.expectedResult,
      actualResult: req.body.actualResult,
      severity: req.body.severity
    };

    const response = await mongodb.getDb().db('BugTracker').collection('bugs').insertOne(bug);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateBug = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bug report id to find a bug report.');
  }
  const bugId = new ObjectId(req.params.id);
  const bug = {
    bugTitle: req.body.bugTitle,
    dateDiscovered: req.body.dateDiscovered,
    environment: req.body.environment,
    stepsToReproduce: req.body.stepsToReproduce,
    expectedResult: req.body.expectedResult,
    actualResult: req.body.actualResult,
    severity: req.body.severity
  };
  const response = await mongodb
    .getDb()
    .db('BugTracker')
    .collection('bugs')
    .replaceOne({ _id: bugId }, bug);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the bug report.');
  }
};

const deleteBug = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a bug report.');
  }
  const bugId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('BugTracker').collection('bugs').deleteOne({ _id: bugId }, true);
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
    createBug,
    updateBug,
    deleteBug
}