import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink as Link,
} from "react-router-dom";
import { DayOne } from "./DayOne";
import { DayTwo } from "./DayTwo";
import { DayThree } from "./DayThree";
import { DayFour } from "./DayFour";
import { DayFive } from "./DayFive";
import { DaySix } from "./DaySix";
import { DaySeven } from "./DaySeven";
import { DayEight } from "./DayEight";
import { DayNine } from "./DayNine";
import { DayTen } from "./DayTen";
import { DayEleven } from "./DayEleven";
import { DayTwelve } from "./DayTwelve";
import { DayThirteen } from "./DayThirteen";
import { DayFourteen } from "./DayFourteen";
import { DayFifteen } from "./DayFifteen";
import { DaySixteen } from "./DaySixteen";
import { DaySeventeen } from "./DaySeventeen";
import { DayEighteen } from "./DayEighteen";
import { DayNineteen } from "./DayNineteen";
import { DayTwenty } from "./DayTwenty";
import { DayTwentyOne } from "./DayTwentyOne";

export const App: React.FunctionComponent<Record<string, never>> = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link activeClassName="active" to="/day_one">
                Day 1
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_two">
                Day 2
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_three">
                Day 3
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_four">
                Day 4
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_five">
                Day 5
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_six">
                Day 6
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_seven">
                Day 7
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_eight">
                Day 8
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_nine">
                Day 9
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_ten">
                Day 10
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_eleven">
                Day 11
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_twelve">
                Day 12
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_thirteen">
                Day 13
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_fourteen">
                Day 14
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_fifteen">
                Day 15
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_sixteen">
                Day 16
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_seventeen">
                Day 17
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_eighteen">
                Day 18
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_nineteen">
                Day 19
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_twenty">
                Day 20
              </Link>
            </li>
            <li>
              <Link activeClassName="active" to="/day_twenty_one">
                Day 21
              </Link>
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
          <Route path="/day_ten">
            <DayTen />
          </Route>
          <Route path="/day_eleven">
            <DayEleven />
          </Route>
          <Route path="/day_twelve">
            <DayTwelve />
          </Route>
          <Route path="/day_thirteen">
            <DayThirteen />
          </Route>
          <Route path="/day_fourteen">
            <DayFourteen />
          </Route>
          <Route path="/day_fifteen">
            <DayFifteen />
          </Route>
          <Route path="/day_sixteen">
            <DaySixteen />
          </Route>
          <Route path="/day_seventeen">
            <DaySeventeen />
          </Route>
          <Route path="/day_eighteen">
            <DayEighteen />
          </Route>
          <Route path="/day_nineteen">
            <DayNineteen />
          </Route>
          <Route path="/day_twenty">
            <DayTwenty />
          </Route>
          <Route path="/day_twenty_one">
            <DayTwentyOne />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
