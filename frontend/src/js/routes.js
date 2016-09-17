import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import EditorPage from './ui/pages/editor';
import InitPage from './ui/pages/init';


export function create(store) {
  const ensureInitialized = function(nextState, replace) {
    if (!store.getState().app.initialized) {
      replace('/');
    }
  }
  
  const ensureNotInitialized = function(nextState, replace) {
    if (store.getState().app.initialized) {
      replace('/editor');
    }
  }

  return (
    <Router history={browserHistory}>
      <Route>
        <IndexRoute component={InitPage} onEnter={ensureNotInitialized} />
        <Route path="/editor" component={EditorPage} onEnter={ensureInitialized}/>
        <Route path="*" component={InitPage} onEnter={ensureNotInitialized}/>
      </Route>    
    </Router>
  );
}


