const validator = require('../helpers/validate');

const saveBugReport = (req, res, next) => {
  const validationRule = {
    bugTitle: 'required|string',
    dateDiscovered: 'required|date',
    environment: 'required|string',
    stepsToReproduce: 'required|string',
    expectedResult: 'required|string',
    actualResult: 'required|string',
    severity: 'required|string'
  };
  
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    employeeID: 'required|string'
  };
  
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = {
  saveBugReport,
  saveUser
};