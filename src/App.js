import Login from "./views/Login"
import Search from "./views/Search";
import Admin from "./views/Admin";
import Users from "./views/Users";
import Settings from "./views/Settings"
import Logs from "./views/Logs"
import { Route, Switch } from "react-router-dom"
import Session from "./views/Session"
import ScrollTop from "./utility/ScrollTop";
import { ContextProvider } from "./utility/Context";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App d-flex flex-column">
      <ScrollTop>
        <ContextProvider>
          <Switch>
            <Route path="/logs" component={Logs} />
            <Route path="/settings" component={Settings} />
            <Route path="/admin-panel" component={Admin} />
            <Route path="/users" component={Users} />
            <Route path="/search" component={Search} />
            <Route path="/session/:id/:otp" component={Session} />
            <Route path="/session/:id" component={Session} />
            <Route path="/activate-account/:otp" component={Login} />
            <Route path="/recover-account/:otp" component={Login} />
            <Route path="/change-password/:id" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        </ContextProvider>
      </ScrollTop>
    </div>
  );
}

export default App;

