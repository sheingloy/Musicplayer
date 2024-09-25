const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use('/', routes);
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(4000, () => {
  console.log('server running on http://localhost:4000');
});
