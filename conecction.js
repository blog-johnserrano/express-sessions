const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://192.168.99.100:27017/express-sessions';
// 'mongodb://localhost/test'
mongoose.connect(uri, { useNewUrlParser: true })
  .then(function () {
    console.log('Success to establish connection with mongodb :)');
  }).catch(function (err) {
    console.log('Failed to establish connection with mongodb :(');
    console.log(err.message);
  });

module.exports = mongoose.connection;