import Immutable from 'immutable';
import { TYPES } from './actions';
import { createStandardMachine } from '../utils/stateMachines';


const InitialState = {
  app: Immutable.Map({
    initialization: createStandardMachine(),
    clientBinaryProvisioning: createStandardMachine(),    
  }),
}


export function app(state = InitialState.app, action) {  
  switch (action.type) {
    case TYPES.INIT:
      state = state.set('initialization', 
        state.get('initialization').update(action)
      );
      break;
    case TYPES.ENSURE_CLIENT:
      state = state.set('clientBinaryProvisioning', 
        state.get('clientBinaryProvisioning').update(action)
      );
      break;    
  }
  
  return state;
};



