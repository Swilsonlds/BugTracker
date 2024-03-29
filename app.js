const express = require('express');
const session = require("express-session");
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(session({ secret: process.env.SESSION_SECRET}))
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

require('./auth/auth');

app.use(cors())
   .use(express.json())
   .use(bodyParser.json())
   .use('/', require('./routes'))

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