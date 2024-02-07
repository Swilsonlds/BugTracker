const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bug Tracker API',
    description: 'A simple API used to perform CRUD operations on a MongoDB database containing bug reports'
  },
  host: 'bugtracker-hag1.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/bugs.js'];

swaggerAutogen(outputFile, routes, doc);