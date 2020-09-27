import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContextProvider from './context/UserContext'
import Home from './components/Home';
import Monthly from './components/Monthly';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/monthly' exact>
            <Monthly />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
