import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await githubApi.get(`/users/${username}`);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GitHub User Search</h1>
      <form onSubmit={handleSubmit}>  {/* Wrap input and button in a form */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}  {/* Remove onClick handler as onSubmit handles it */}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="card p-4">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full" />
          <h2 className="text-2xl font-bold">{user.login}</h2>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" className="text-blue-500 hover:underline">
            View Profile
          </a>
        </div>
      )}
      {!user && !isLoading && <p>Enter a username to search.</p>}
    </div>
  );
};

export default Search;
