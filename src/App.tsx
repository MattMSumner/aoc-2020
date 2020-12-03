import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DayOne } from "./DayOne";
import { DayTwo } from "./DayTwo";
import { DayThree } from "./DayThree";

export const App: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <Router basename="/aoc-2020">
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
        </Switch>
      </div>
    </Router>
  );
};
