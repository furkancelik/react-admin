import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "../helpers/ScrollToTop";
import FlashMessageReset from "../helpers/FlashMessageReset";
import sessionWrapperHOC from "./sessionWrapperHOC";
import { FILE_MANAGER_PATH, ROUTE_BASENAME } from "../config";
//Pages
import Dashboard from "./Dashboard";
import { UserData, UserCreate, UserDetail, UserEdit } from "./Users";
import { PostData, PostCreate, PostEdit, PostDetail } from "./Posts";

import FileManager from "./FileManager";
import NoMatch from "./NoMatch";

const history = createBrowserHistory();

function Routers({ session }) {
  return (
    <Router history={history} basename={ROUTE_BASENAME}>
      <FlashMessageReset />
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: "/dashboard" }} />
        </Route>
        {/* Dashboard Page */}
        <Route exact path={"/dashboard"} component={Dashboard} />

        {/* User Page */}
        <Route exact path={"/user"} component={UserData} />
        <Route path={"/user/create"} component={UserCreate} />
        <Route path={"/user/edit/:id"} component={UserEdit} />
        <Route path={"/user/detail/:id"} component={UserDetail} />

        {/* Post Page */}
        <Route exact path={"/post"} component={PostData} />
        <Route path={"/post/create"} component={PostCreate} />
        <Route path={"/post/edit/:id"} component={PostEdit} />
        <Route path={"/post/detail/:id"} component={PostDetail} />

        <Route path={FILE_MANAGER_PATH} component={FileManager} />

        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default sessionWrapperHOC(Routers);
