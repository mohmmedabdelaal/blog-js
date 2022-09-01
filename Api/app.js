var express = require('express');
var app = express();
const multer = require('multer');
console.log(multer);

var PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('The server now is running');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:', `http://localhost:${PORT}/`);
});
