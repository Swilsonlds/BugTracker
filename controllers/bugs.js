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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('bugs').find({ _id: userId });
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

module.exports = {
    getAll,
    getSingle,
    createBug
}