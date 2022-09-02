import '../assets/css/style.css';
import axios from 'axios';

const API_URL = 'http://localhost:3000/srv/post';
const API_BASE_URL = 'http://localhost:3000/';
const mainContent = document.querySelector('.main-content');

window.onload = () => {
  getPosts();
};

const getPosts = async () => {
  const data = await axios.get(API_URL).then((res) => res.data);
  const newPost = data.map((post) => {
    const { id, title, content, post_image, added_date } = post;
    const baseImage = `${API_BASE_URL}${post_image}`;
    const date = new Date(parseInt(added_date)).toDateString();
    const postLink = `/single-post.html?id=${id}`;

    return `
    <a class="post-link"  href="${postLink}">
      <div class="post">
        <div class="post-photo">
          <img
          class="cover"
          src="${baseImage}"
          />
        </div>
        <div class="post-content">
          <p class="post-date">${date}</p>
          <h3 class="post-title">${title}</h3>
          <h4 class="post-description">
          ${content}
          </h4>
        </div>
      </div>
    </a>
    `;
  });
  mainContent.innerHTML = newPost;
};

const buildPosts = (blogPosts) => {};
