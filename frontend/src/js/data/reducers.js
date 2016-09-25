import { TYPES } from './actions';
import { 
  createStandard as createStandardMachine, 
  update as updateMachine 
} from '../utils/stateMachines';


const InitialState = {
  app: {
    initialization: createStandardMachine(),
    clientBinaryProvisioning: createStandardMachine(),
  }
}


export function app(state = InitialState.app, action) {
  switch (action.type) {
    case TYPES.INIT:
      Object.assign(state, {
        initialization: updateMachine(state.initialization, action),
      });        
      break;
    case TYPES.CLIENT_BINARY:
      Object.assign(state, {
        clientBinaryProvisioning: updateMachine(state.clientBinaryProvisioning, action),
      });        
      break;    
  }
  
  return state;
};



