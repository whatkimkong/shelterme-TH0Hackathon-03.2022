import axios from "axios";
// URLS are only Backend URLS

class CommentService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/comments`,
      withCredentials: true,
    });
  }

  getAllComments = (comment) => {
    return this.service.get(`/all`);
  };
}

const commentService = new CommentService();
export default commentService;
