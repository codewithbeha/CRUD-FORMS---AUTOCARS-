import Sidebar from './Components/sidebar/Sidebar';
import {Department} from './Pages/Department';
import {Employee} from './Pages/Employee';
import {Auto} from './Pages/Auto';
import {City} from './Pages/City';
import {Country} from './Pages/Country';
import {Users} from './Pages/Users';
import {Origin} from './Pages/Origin';
import {Extras} from './Pages/Extras';
import {Details} from './Pages/Details';
import {Sales} from './Pages/Sales';
import Home from './Pages/Home';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from "./Components/topbar/Topbar";
import "./App.css";


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/department">
            <Department />
          </Route>
          <Route path="/city">
            <City />
          </Route>
          <Route path="/country">
            <Country />
          </Route>
          <Route path="/auto">
            <Auto />
          </Route>
          <Route path="/origin">
            <Origin />
          </Route>
          <Route path="/extras">
            <Extras />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/sales">
            <Sales />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
