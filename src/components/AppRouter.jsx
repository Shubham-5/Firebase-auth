import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotfoundPage from "../pages/NotfoundPage";
import Profilepage from "../pages/Profilepage";
import ProtectedPage from "../pages/ProtectedPage";
import Registerpage from "../pages/Registerpage";

import { useAuth } from "../context/AuthContext";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoutes exact path='/login' component={Loginpage} />
          <ProtectedRoutes exact path='/register' component={Registerpage} />
          <ProtectedRoutes exact path='/profile' component={Profilepage} />
          <ProtectedRoutes
            exact
            path='/protected-page'
            component={ProtectedPage}
          />
          <ProtectedRoutes
            exact
            path='/forgot-password'
            component={ForgotPasswordPage}
          />

          <ProtectedRoutes exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoutes(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  const location = useLocation();

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/profile"} />
    ) : (
      <Route {...props} />
    );
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
