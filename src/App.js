import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./pages/Search/Search";
import { ThemeProvider } from "styled-components";
import { crukTheme } from "@cruk/cruk-react-components";
import { SiteWrapper } from "./shared/theme";

const App = () => (
  <Router>
    <ThemeProvider theme={crukTheme}>
      <SiteWrapper>
        <Route path="/" component={Search} />
      </SiteWrapper>
    </ThemeProvider>
  </Router>
);

export default App;
