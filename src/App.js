import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "./components/main";
import Auth from "./components/auth";
import "./index.css";
import { ProvideAuth, useAuth } from "./components/auth/useAuth";

function App(props) {
  return (
    <ProvideAuth>
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/app" />
            </Route>
            <PrivateRoute path="/app">
              <Main />
            </PrivateRoute>
            <Route to="/auth">
              <Auth />
            </Route>
          </Switch>
        </Router>
      </>
    </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/auth", state: { from: location } }} />
        );
      }}
    ></Route>
  );
}

export default App;
