import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderBar from './NavigationBar/HeaderBar'
import { Pages } from './Pages'

const MainPage = (props) => {
    const { login } = props;
    return (
      <div>
        {login ?
          <div className="App">
            <HeaderBar/>
            
            <Switch>
              {Pages.map(item => 
                <Route
                  key={item.path} 
                  path={item.path}
                  component={item.main}>
                </Route>
              )}

              <Route path="*">
                <div>
                  NO MATCH
                </div>
              </Route>
            </Switch>
          </div>
        : <Redirect to={{pathname:'/'}}/>}
      </div>
    )
  }

  export default MainPage;
  