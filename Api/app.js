const express = require('express');
const app = express();
const multer = require('multer');
const Post = require('./models/post');
const postsData = new Post();

const PORT = 3000;

/// multer to save image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case 'image/png':
      return '.png';
    case 'image/jpeg':
      return '.jpg';
  }
};

var upload = multer({ storage: storage });
////////////

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/posts', (req, res) => {
  res.status(200).send(postsData.get());
});

app.get('/api/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const posts = postsData.get();
  const foundPost = posts.find((post) => post.id == postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send('Not Found');
  }
});

const type = upload.single('post-image');

app.post('/api/posts', type, (req, res) => {
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: req.file.path,
    added_date: `${Date.now()}`,
  };
  postsData.add(newPost);
  res.status(201).send(postsData);
});

app.listen(PORT, () => {
  console.log('Server is running on PORT:', `http://localhost:${PORT}/`);
});
