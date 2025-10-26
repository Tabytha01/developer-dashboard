import { useState, useEffect } from 'react';

const GitHubCard = ({ darkMode, username = 'octocat' }) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
          throw new Error(`GitHub user "${username}" not found`);
        }
        
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  if (loading) {
    return (
      <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">GitHub Profile Error</h3>
          <p className="text-sm opacity-75">{error}</p>
          <p className="text-xs mt-2 opacity-50">Please check the username and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={githubData.avatar_url} 
          alt={`${githubData.login}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <div>
          <h3 className="text-xl font-bold">{githubData.name || githubData.login}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            @{githubData.login}
          </p>
          {githubData.bio && (
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {githubData.bio}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {githubData.public_repos}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Repositories
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {githubData.followers}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Followers
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {githubData.following}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Following
          </div>
        </div>
      </div>

      {githubData.location && (
        <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {githubData.location}
        </div>
      )}
    </div>
  );
};

export default GitHubCard;