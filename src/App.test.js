import {render } from '@testing-library/react';
// import { Renderer } from 'react-dom';
import {screen, waitFor} from '@testing-library/dom'
import App from './App';

beforeEach(() => {
    fetch.resetMocks()
})
test("receives GitHub name from GitHub REST API using jest fetch mock", async () => {
    fetch.mockResponseOnce(JSON.stringify({name: 'coder'}))
    render(<App />)
    const gitHubName = await waitFor(() => screen.getByRole('heading', { level: 2 }))
    expect(gitHubName).toHaveTextContent('coder')
  })

  test("checks whether the attribute is the correct URL from the GitHub REST API using Jest Fetch Mock", async () => {
    fetch.mockResponseOnce(JSON.stringify({html_url: 'coder'}))
    render(<App />)
    const gitHubUrl = await waitFor(() => screen.getByRole('link'))
    expect(gitHubUrl).toHaveAttribute('href', 'coder')
  })

  test("checks forthe gitHub profile image to have the correct src attribute", async () => {
    fetch.mockResponseOnce(JSON.stringify({avatar_url: 'coder'}))
    render(<App />)
    const gitHubImg = await waitFor(() => screen.getByRole('img'))
    expect(gitHubImg).toHaveAttribute('src', 'coder')
  })

  test("checks for the github repositories for the profile", async () => {
    fetch.mockResponseOnce(JSON.stringify({repos_url: 'coder'}))
    render(<App />)
    const gitHubRepos = await waitFor(() => screen.getByRole('list'))
    expect(gitHubRepos).toHaveAttribute('href', 'coder')
  })
