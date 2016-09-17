import { TYPES } from './actions';


export function app(state = {}, action) {
  [
    [
      TYPES.INIT, () => {
        Object.assign(state, {
          initialized: true
        });        
      }
    ],
  ].forEach((h) => {
    if (h[0] === action.type) {
      h[1]();
    }
  });
  
  return state;
};



