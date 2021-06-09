import './App.css';
import Sidebar from './Components/sidebar/Sidebar';
import {Department} from './Pages/Department';
import {Employee} from './Pages/Employee';
import {City} from './Pages/City';
import {Country} from './Pages/Country';
import {Brand} from './Pages/Brand';
import {Model} from './Pages/Model';
import {Users} from './Pages/Users';
import {Logout} from './Pages/Logout';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <div className="container">
    <Navigation/>

      <Switch>
        <Route path='/' component={Sidebar} exact/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
        <Route path='/users' component={Users}/>
        <Route path='/country' component={Country}/>
        <Route path='/city' component={City}/>
        <Route path='/brand' component={Brand}/>
        <Route path='/model' component={Model}/>
        <Route path='/logout' component={Logout}/>

      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
