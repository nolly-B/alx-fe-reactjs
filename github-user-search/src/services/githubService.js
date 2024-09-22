import axios from "axios";

const githubService = axios.create({
  baseURL: "",
});

export default githubService;
