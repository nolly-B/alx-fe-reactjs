import React, { useState } from "react";
import { fetchUsers } from "../services/githubService";

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

        <div className="w-full md:w-1/2 mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>

          <input
            type="text"
            id="location"
            className="appearance-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Enter user location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/2 mb-4">
          <label
            htmlFor="minRepos"
            className="block text-gray-700 font-bold mb-2"
          >
            Min Repositories
          </label>

          <input
            type="number"
            id="minRepos"
            className="appearance-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Minimum number of repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(parseInt(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      {users.length.map > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
      )}
      {!users.length && isLoading && <p>Searching users...</p>}
      {!users.length && !isLoading && <p>No results found.</p>}
    </div>
  );
};

export default Search;
