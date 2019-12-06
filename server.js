const app = require('./lib/app');
require('dotenv').config();

require('./lib/utils/connect')();

app.listen('7890', () => {
  console.log('started!');
});
