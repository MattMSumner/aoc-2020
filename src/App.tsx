import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DayOne } from "./DayOne";
import { DayTwo } from "./DayTwo";
import { DayThree } from "./DayThree";
import { DayFour } from "./DayFour";

export const App: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/day_one">Day 1</Link>
            </li>
            <li>
              <Link to="/day_two">Day 2</Link>
            </li>
            <li>
              <Link to="/day_three">Day 3</Link>
            </li>
            <li>
              <Link to="/day_four">Day 4</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/day_one">
            <DayOne />
          </Route>
          <Route path="/day_two">
            <DayTwo />
          </Route>
          <Route path="/day_three">
            <DayThree />
          </Route>
          <Route path="/day_four">
            <DayFour />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
