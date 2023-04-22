import { Route, Switch } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
