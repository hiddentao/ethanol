import Machine from 'immutable-state-machine';


class FluxActionMachine extends Machine {
  constructor (cfg) {
    super(cfg, FluxActionMachine)
  }
  
  update(fluxAction) {
    let payload = fluxAction.payload || fluxAction,
      state = payload.state || payload,
      data = payload.data || null;
      
    return this.goto(state, data);
  }
}



export function createStandardMachine () {
  return new FluxActionMachine([
    {
      id: 'ready',
      from: [],
      to: ['in_progress', 'success', 'error'],
    },
    {
      id: 'in_progress',
      from: ['ready'],
      to: ['success', 'error'],
    },
    {
      id: 'success',
      from: ['ready', 'in_progress'],
      to: ['ready'],
    },
    {
      id: 'error',
      from: ['ready', 'in_progress'],
      to: ['ready'],
    },
  ]);
}

