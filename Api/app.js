const express = require('express');
const app = express();
const multer = require('multer');
const Posts = require('./models/post');
const postData = new Posts();

const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

app.get('/srv/post', (req, res) => {
  res.status(200).send(postData.get());
});

app.get('/srv/post/:postid', (req, res) => {
  const postId = req.params.postid;
  const posts = postData.get();
  const foundPost = posts.find((post) => post.id == postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send('Id Not Found');
  }
});

app.get('/', (req, res) => {
  res.status(200).send('The server now is running');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:', `http://localhost:${PORT}/`);
});
