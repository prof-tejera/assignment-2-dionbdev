import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Home from "./views/Home";
import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import Add from "./views/Add";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="/timers">Timers</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/timers" element={<TimersView />} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
