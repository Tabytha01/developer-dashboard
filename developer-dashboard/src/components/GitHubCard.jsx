import React from 'react';

export default function GitHubCard({ data }) {
  if (!data) return null;
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <img src={data.avatar_url} alt="" className="w-20 h-20 rounded-full mb-4" />
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-blue-500">@{data.login}</p>
      <div className="mt-4 flex gap-4">
        <div><p className="font-bold">{data.public_repos}</p><p className="text-sm">Repos</p></div>
        <div><p className="font-bold">{data.followers}</p><p className="text-sm">Followers</p></div>
      </div>
    </div>
  );
}
