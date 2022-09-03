import axios from 'axios';
import '../assets/css/style.css';
import '../assets/css/new-post.css';

const API_URL = 'http://localhost:3000/api/posts';
const API_BASE_URL = 'http://localhost:3000/';

const form = document.querySelector('form');
const titleInput = document.getElementById('form-post-title');
const contentInput = document.getElementById('form-post-content');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = document.querySelector('input[type="file"]');
  const title = titleInput.value;
  const content = contentInput.value;
  let data = new FormData();
  data.append('post-image', input.files[0]);
  data.append('title', title);
  data.append('content', content);

  fetch(API_URL, {
    method: 'POST',
    body: data,
  })
    .then((res) => console.log(res))
    .then(() => {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    })
    .catch((err) => console.log(err));
});
