const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  database.connect();
});
