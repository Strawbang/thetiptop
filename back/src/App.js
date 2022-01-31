import React, {} from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '@Pages/Home';
import User from '@Pages/User';
import UserAdd from '@Pages/AddEdit/UserAdd';
import UserEdit from '@Pages/AddEdit/UserEdit';
import Role from '@Pages/Role';
import RoleAdd from '@Pages/AddEdit/RoleAdd';
import RoleEdit from '@Pages/AddEdit/RoleEdit';
import Ticket from '@Pages/Ticket';
import TicketEdit from '@Pages/AddEdit/TicketEdit';
import SignIn from '@Pages/SignIn';

function App() {  
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route path='/signin'>
              <SignIn></SignIn>
            </Route>
            <Route exact strict path='/users'>
              <User></User>
            </Route>
            <Route path='/users/add'>
              <UserAdd></UserAdd>
            </Route>
            <Route path='/users/edit/:id'>
              <UserEdit></UserEdit>
            </Route>
            <Route exact strict path='/roles'>
              <Role></Role>
            </Route>
            <Route path='/roles/add'>
              <RoleAdd></RoleAdd>
            </Route>
            <Route path='/roles/edit/:id'>
              <RoleEdit></RoleEdit>
            </Route>
            <Route exact strict path='/tickets'>
              <Ticket></Ticket>
            </Route>
            <Route path='/tickets/edit/:id'>
              <TicketEdit></TicketEdit>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
