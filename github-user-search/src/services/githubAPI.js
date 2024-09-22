import axios from "axios";

const githubApi = axios.create({
  baseURL: "",
});

export default githubApi;
