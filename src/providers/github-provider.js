import  React, {createContext, useCallback, useState} from 'react';
import api from '../services/api';

export const GitHubContext = createContext({
  loading: false,
  user: {},
  repositories: [],
  starred: []
});

const GitHbProvider = ({children}) => {
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user:{
      id: undefined,
      avatar: undefined,
      login: undefined,
      name: undefined,
      html_url: undefined,
      blog: undefined,
      company: undefined,
      location: undefined,
      followers: 0,
      following: 0,
      public_gists: 0,
      public_repos: 0,
    },
    repositories: [],
    starred: [],
  });
  
  const getUser = (username) => {
    setGithubState((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }));

    api.get(`/users/${username}`)
      .then(({data}) => {
        setGithubState((prevState) => ({
          ...prevState,
          loading: !prevState.loading,
          user: {
            id: data.id,
            avatar: data.avatar_url,
            login: data.login,
            name: data.name,
            html_url: data.html_url,
            blog: data.blog,
            company: data.company,
            location: data.location,
            followers: data.followers,
            following: data.following,
            public_gists: data.public_gists,
            public_repos: data.public_repos,
          },
        }));
      })
      .finally( () => {
        setGithubState((prevState) => ({
          ...prevState,
          loading: !prevState.loading,
        }));
      })
  };

  const getUserRepo = (username) => {
    api.get(`/users/${username}/repos`)
      .then(({data}) => {
        console.log("data: " + JSON.stringify(data));
        setGithubState((prevState) => ({
          ...prevState,
          repositories: data,
        }));
      });
    };

  const getUserStarred = (username) => {
    api.get(`/users/${username}/starred`)
      .then(({data}) => {
        console.log("data: " + JSON.stringify(data));
        setGithubState((prevState) => ({
          ...prevState,
          starred: data,
        }));
      });
  };

  const contextValue = {
    githubState,
    getUser: useCallback((username) =>  getUser(username), []),
    getUserRepo: useCallback((username) =>  getUserRepo(username), []),
    getUserStarred: useCallback((username) =>  getUserStarred(username), []),
  }

  return (
    <GitHubContext.Provider value={contextValue}>
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHbProvider;