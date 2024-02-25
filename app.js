const express = require('express');
const session = require("express-session");
const cors = require('cors');
const passport = require('passport')

const app = express();

app.use(session({ secret: "dfljasldkjfoij5234tjofdo"}))
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

require('./auth/auth');

app.use(express.json())
   .use(bodyParser.json())
   .use('/', require('./routes'))
   .use(cors())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
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