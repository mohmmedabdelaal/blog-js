import '../assets/css/style.css';
import axios from 'axios';

const API_URL = 'http://localhost:3000/srv/post';
const API_BASE_URL = 'http://localhost:3000/';
const postTitle = document.getElementById('individual-post-title');
const postContent = document.getElementById('individual-post-content');
const postDate = document.getElementById('individual-post-date');

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
  const { id, title, content, added_date } = data;
  const date = new Date(parseInt(added_date)).toDateString();
  postTitle.textContent = title;
  postContent.textContent = content;
  postDate.textContent = date;
};
