import '../assets/css/style.css';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';
const API_BASE_URL = 'http://localhost:3000/';

const postTitle = document.getElementById('individual-post-title');
const postContent = document.getElementById('individual-post-content');
const postDate = document.getElementById('individual-post-date');
const header = document.querySelector('header');

window.onload = () => {
  getSinglePost();
};
const getUrlId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
};

const getSinglePost = async () => {
  const data = await axios
    .get(`${API_URL}/${getUrlId()}`)
    .then((res) => res.data);
  const { id, title, content, added_date, post_image } = data;
  const baseImage = `${API_BASE_URL}${post_image}`;
  const date = new Date(parseInt(added_date)).toDateString();
  postTitle.textContent = title;
  postContent.textContent = content;
  postDate.textContent = `Published on ${date}`;
  header.style.backgroundImage = `url(${baseImage})`;
};
