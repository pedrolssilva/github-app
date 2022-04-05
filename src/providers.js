import React from "react";
import App from "./App";
import {ResetCSS} from "./global/resetCSS";
import GitHubProvider from "./providers/GitHub-provider";

const Providers = () => {
  return (
    <main>
      <GitHubProvider>
        <ResetCSS />
        <App />
      </GitHubProvider>
    </main>
  );
};

export default Providers;
