import React from "react";
import "./App.css";
import RegistrationForm from "./pages/registrationform";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/register/:ids">
              <RegistrationForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
