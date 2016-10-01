import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

import EditorPage from './ui/pages/editor';
import InitPage from './ui/pages/init';


export function create(store) {
  const ensureInitialized = function(nextState, replace) {
    const initialization = store.getState().app.get('initialization');
    
    if ('success' !== initialization.getState()) {
      replace('/');
    }
  }
  
  const ensureNotInitialized = function(nextState, replace) {
    const initialization = store.getState().app.get('initialization');

    if ('success' === initialization.getState()) {
      replace('/editor');
    }
  }

  return (
    <Route>
      <IndexRoute component={InitPage} onEnter={ensureNotInitialized} />
      <Route path="/editor" component={EditorPage} onEnter={ensureInitialized}/>
      <Route path="*" component={InitPage} onEnter={ensureNotInitialized}/>
    </Route>    
  );
}


