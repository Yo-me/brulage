import './App.css';

import React from "react"

import {
  Nav,
  Navbar
} from "react-bootstrap";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Admin from "./pages/admin/Admin";
import Teams from "./pages/teams/Teams";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">Gestion des brulages</Navbar.Brand>
                <Nav variant="pills" className="justify-content-start"> 
                  <Nav.Item>
                    <Nav.Link as={Link} to="/teams">Mes &eacute;quipes</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Nav variant="pills" className="justify-content-end"> 
                  <Nav.Item>
                    <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar>
              <Switch>
                <Route path="/teams">
                  <Teams/>
                </Route>
                <Route path="/">
                  <p>Hello World !</p>
                </Route>
              </Switch>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
