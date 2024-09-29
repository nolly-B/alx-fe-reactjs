import React, { useState } from "react";
import { fetchUsers, fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUsers([]);
    try {
      const response = await fetchUsers(username, location, minRepos);
      setUsers(response.data.items);

      // Call fetchUserData for each retrieved user (optional)
      if (users.length > 0) {
        const detailedUsers = await Promise.all(
          users.map(async (user) => {
            const userData = await fetchUserData(user.login);
            return { ...user, ...userData }; // Combine user data
          })
        );
        setUsers(detailedUsers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub User Search</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <div className="w-full md:w-1/2 mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="appearance-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* ... other form fields ... */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      {/* Display search results */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="card p-4">
              <a href={user.html_url} target="_blank" rel="noreferrer">
                <h3 className="text-lg font-medium">{user.login}</h3>
              </a>
              {user.location && <p>Location: {user.location}</p>}
              <p>Public Repositories: {user.public_repos}</p>
              {/* Display additional user details if fetched (optional) */}
              {user.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 h-10 rounded-full mx-auto mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {!users.length && isLoading && <p>Searching users...</p>}
      {!users.length && !isLoading && <p>No results found.</p>}
    </div>
  );
};

export default Search;
