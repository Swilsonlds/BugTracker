const express = require('express');
const app = express();
const PORT = 3000;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

app.use(express.json())
   .use(bodyParser.json())
   .use('/', require('./routes'))
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(PORT);
      console.log(`Connected to DB and listening on ${PORT}`);
    }
});