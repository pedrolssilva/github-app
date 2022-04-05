import Repositories from "./components/Repositories";
import useGitHub from "./hooks/github-hooks";

const App = () => {
  const { githubState } = useGitHub();
  return (
    <Layout>
     {githubState.hasUser ? (
       <>
        {githubState.loading ? (
          <p>Loading</p>
        ): (
          <>
            <Profile />
            <Repositories />
          </>
        )}
       </>
     ) : (
       <NoSearch />
     )}
    </Layout>
  );
};

export default App;
