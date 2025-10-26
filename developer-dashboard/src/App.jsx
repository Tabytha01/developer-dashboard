import { useState, useEffect } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Toggle dark/light mode
  const toggleTheme = () => setIsDark(!isDark);

  // Fetch GitHub data
  useEffect(() => {
    fetch('https://api.github.com/users/Tabytha01')
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
        setGithubLoading(false);
      })
      .catch(() => setGithubLoading(false));
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className={isDark ? 'bg-gray-900 text-white min-h-screen' : 'bg-blue-50 text-gray-900 min-h-screen'}>
      {/* Navbar */}
      <div className="flex justify-between items-center p-6 shadow-md">
        <h1 className="text-2xl font-bold">Developer Dashboard</h1>
        <button
          onClick={toggleTheme}
          className={isDark ? 'bg-gray-700 px-4 py-2 rounded' : 'bg-gray-200 px-4 py-2 rounded'}
        >
          {isDark ? ' Light' : ' Dark'}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Card */}
        <div className={isDark ? 'bg-gray-800 p-6 rounded-lg shadow' : 'bg-white p-6 rounded-lg shadow'}>
          <h2 className="text-xl font-bold mb-4">GitHub Profile</h2>
          {githubLoading ? (
            <p>Loading...</p>
          ) : githubData ? (
            <div className="text-center">
              <img
                src={githubData.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <h3 className="font-semibold">{githubData.name}</h3>
              <p className="text-blue-500">@{githubData.login}</p>
              <div className="flex justify-around mt-4">
                <div>
                  <p className="font-bold">{githubData.public_repos}</p>
                  <p className="text-sm">Repos</p>
                </div>
                <div>
                  <p className="font-bold">{githubData.followers}</p>
                  <p className="text-sm">Followers</p>
                </div>
                <div>
                  <p className="font-bold">{githubData.following}</p>
                  <p className="text-sm">Following</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Error loading data</p>
          )}
        </div>

        {/* Time Card */}
        <div className={isDark ? 'bg-gray-800 p-6 rounded-lg shadow text-center' : 'bg-white p-6 rounded-lg shadow text-center'}>
          <h2 className="text-xl font-bold mb-4">Current Time</h2>
          <p className="text-4xl font-bold">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
