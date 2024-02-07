const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('bugs').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};
  
  const getSingle = async (req, res) => {
    const bugId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('bugs').find({ _id: bugId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
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

    const response = await mongodb.getDb().db().collection('bugs').insertOne(bug);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };

const updateBug = async (req, res) => {
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
    .db()
    .collection('bugs')
    .replaceOne({ _id: bugId }, bug);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteBug = async (req, res) => {
  const bugId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('bugs').deleteOne({ _id: bugId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createBug,
    updateBug,
    deleteBug
}