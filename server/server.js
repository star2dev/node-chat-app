const path = require('path'),
publicPath = path.join(__dirname, '../public'),
express = require('express');

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

// module.exports = {app};
