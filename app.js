var express = require('express');
var path = require('path');
var index = require('./routes/index');
var tweets = require('./routes/tweets');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use('/', index);
app.use('/tweets', tweets);


module.exports = app;

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
