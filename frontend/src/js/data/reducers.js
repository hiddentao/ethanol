import Immutable from 'immutable';
import { TYPES } from './actions';
import { createStandardMachine } from '../utils/stateMachines';


const InitialState = {
  app: Immutable.Map({
    initialization: createStandardMachine(),
    backendInitialization: createStandardMachine(),    
  }),
}


export function app(state = InitialState.app, action) {  
  switch (action.type) {
    case TYPES.INIT:
      state = state.set('initialization', 
        state.get('initialization').update(action)
      );
      break;
    case TYPES.BACKEND_INIT:
      state = state.set('backendInitialization', 
        state.get('backendInitialization').update(action)
      );
      break;    
  }
  
  return state;
};



