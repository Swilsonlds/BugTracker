const express = require('express');
const app = express();
const PORT = 3000;
const mongodb = require('./db/connect');

app.use(express.json())
   .use('/', require('./routes'))
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(PORT);
      console.log(`Connected to DB and listening on ${PORT}`);
    }
});