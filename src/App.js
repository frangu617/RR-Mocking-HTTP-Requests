import React, { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [gitHubName, setGitHubName] = useState('')
  const [gitHubUrl, setGitHubUrl] = useState('')
  const [gitHubImg, setGitHubImg] = useState('')
  const [gitHubRepos, setGitHubRepos] = useState([])


  useEffect(() => {
    fetch('https://api.github.com/users/frangu617')
      .then(res => res.json())
      .then(data => {
        setGitHubName(data.name)
        setGitHubUrl(data.html_url)
        setGitHubImg(data.avatar_url)
        

        fetch(data.repos_url)
        .then(res => res.json())
        .then(reposData => {
          if (Array.isArray(reposData)) {
            setGitHubRepos(reposData);
          } else {
            console.error('Expected an array of repositories', reposData);
          }
        })
        .catch(err => console.error('Error fetching repos:', err));
      
      })
  }, [])

  return (
    <div className="App">
      <h1>Github Profile Info:</h1>
      <h2>{gitHubName}</h2>
      <a href={gitHubUrl}><button style={{margin: '20px'}}>GitHub Profile</button></a>

      <div><img src={gitHubImg} alt="GitHub Profile" /></div>

      <h3>GitHub Repos:</h3>
      <ul>
        {gitHubRepos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App
