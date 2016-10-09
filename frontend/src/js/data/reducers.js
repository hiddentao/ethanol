import Immutable from 'immutable';
import { TYPES } from './actions';
import { createStandardMachine } from '../utils/stateMachines';


const InitialState = {
  app: Immutable.Map({
    initialization: createStandardMachine(),
    backendInitialization: createStandardMachine(),    
    web3: null,
  }),
  executor: Immutable.Map({
    autoCompile: false,
  }),
  chaindata: Immutable.Map({
    accounts: Immutable.List(),
    blocks: Immutable.List(),
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
    case TYPES.WEB3:
      state = state.set('web3', action.payload);
      break;    
  }
  
  return state;
};



export function chaindata(state = InitialState.chaindata, action) {  
  switch (action.type) {
    case TYPES.ACCOUNTS:
      state = state.set('accounts', action.payload);
      break;
    case TYPES.BLOCK:
      state = state.set('blocks', 
        state.get('blocks').push(action.payload)
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



