import { useContext } from "react";
import { GitHubContext } from "../providers/github-provider";

const useGitHub = () => {
  const { githubState, getUser, getUserRepos, getUserStarred} = useContext(
    GitHubContext 
  );

  return { githubState, getUser, getUserRepos, getUserStarred };
};

export default useGitHub;