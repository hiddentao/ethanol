import Immutable from 'immutable';
import { TYPES } from './actions';
import { createStandardMachine } from '../utils/stateMachines';


const InitialState = {
  app: Immutable.Map({
    initialization: createStandardMachine(),
    backendInitialization: createStandardMachine(),    
    web3Initialization: createStandardMachine(),
  }),
  executor: Immutable.Map({
    autoCompile: false,
  }),
  blocks: Immutable.Map({
    chain: Immutable.List(),
    error: null,
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
    case TYPES.WEB3_INIT:
      state = state.set('web3Initialization', 
        state.get('web3Initialization').update(action)
      );
      break;    
  }
  
  return state;
};



export function blocks(state = InitialState.blocks, action) {  
  switch (action.type) {
    case TYPES.BLOCK:
      state = state.set('chain', 
        state.get('chain').push(action.payload)
      );
      break;
    case TYPES.BLOCK_ERROR:
      state = state.set('error', action.payload.error); 
      break;    
  }
  
  return state;
};



export function executor(state = InitialState.executor, action) {  
  return state;
};



