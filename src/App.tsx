import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DayOne } from "./DayOne";

export const App: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/day_one">Day 1</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/day_one">
            <DayOne />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
