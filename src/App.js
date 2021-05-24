import './App.css';
import SignIn from './components/SignInPage/SignInPage'
import {BrowserRouter as Router, Switch, Route }
  from 'react-router-dom';
import { useState } from 'react';
import MainPage from './components/MainPage/MainPage'


function App() {
  const [login, setLogin] = useState(false);

  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/'>
            <SignIn setLogin={setLogin}/>
          </Route>

          <Route path='/home'>
            <MainPage login={login}/>
          </Route>

          <Route path="*">
            <div>
              NO MATCH
            </div>
          </Route>
        </Switch>
        
    </Router>

  );
}

export default App;
