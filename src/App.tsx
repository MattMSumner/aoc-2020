import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DayOne } from "./DayOne";
import { DayTwo } from "./DayTwo";
import { DayThree } from "./DayThree";
import { DayFour } from "./DayFour";
import { DayFive } from "./DayFive";
import { DaySix } from "./DaySix";
import { DaySeven } from "./DaySeven";
import { DayEight } from "./DayEight";
import { DayNine } from "./DayNine";

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
            <li>
              <Link to="/day_five">Day 5</Link>
            </li>
            <li>
              <Link to="/day_six">Day 6</Link>
            </li>
            <li>
              <Link to="/day_seven">Day 7</Link>
            </li>
            <li>
              <Link to="/day_eight">Day 8</Link>
            </li>
            <li>
              <Link to="/day_nine">Day 9</Link>
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
          <Route path="/day_five">
            <DayFive />
          </Route>
          <Route path="/day_six">
            <DaySix />
          </Route>
          <Route path="/day_seven">
            <DaySeven />
          </Route>
          <Route path="/day_eight">
            <DayEight />
          </Route>
          <Route path="/day_nine">
            <DayNine />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
