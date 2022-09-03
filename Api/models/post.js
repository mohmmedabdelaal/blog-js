const fs = require('fs');
const PATH = './data.json';

class Post {
  add(newPost) {
    const currentData = this.readData();
    currentData.unshift(newPost);
    this.storeData(currentData);
  }
  getSinglePost(id) {
    const currentData = this.readData();
    return currentData.find((post) => post.id === id);
  }

  get() {
    return this.readData();
  }

  readData() {
    try {
      return JSON.parse(fs.readFileSync(PATH, 'utf8'));
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  storeData(data) {
    try {
      fs.writeFileSync(PATH, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Post;
