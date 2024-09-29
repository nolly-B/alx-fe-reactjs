import axios from "axios";

const githubService = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async (username, location, minRepos) => {
  try {
    let url = "https://api.github.com/search/users?q=";
    url += username;

    if (location) {
      url += `+location:${location}`;
    }

    if (minRepos) {
      url += `+public:>${minRepos}`;
    }

    const response = await githubService.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default githubService;
