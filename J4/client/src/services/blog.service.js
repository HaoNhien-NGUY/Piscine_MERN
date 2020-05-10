import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8800/blog/';

class BlogService {
  getUserPost(userId) {
    return axios.get(API_URL + userId);
  }

  getAllPost() {
    return axios.get(API_URL);
  }

  getPostDetails(id) {
    return axios.get(API_URL + "details/" + id);
  }

  postComment(content, postId) {
    return axios.post(API_URL + "comment/create/" + postId, {
      content,
      postId
    },
      { headers: authHeader() }
    );
  }
}

export default new BlogService();