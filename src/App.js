import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cases from './components/cases/cases'
import Create from './components/createCase/create'


function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Cases}></Route>
          <Route path="/cases/create" exact component={Create}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
