import axios from "axios";

const githubService = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchUserData = async (username) => {
  try {
    const response = await githubService.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default githubService;
