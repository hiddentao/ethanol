import Machine from 'immutable-state-machine';


export function createStandard () {
  return new Machine([
    {
      id: 'ready',
      from: [],
      to: ['in_progress'],
    },
    {
      id: 'in_progress',
      from: ['ready'],
      to: ['success', 'error'],
    },
    {
      id: 'success',
      from: ['in_progress'],
      to: ['ready'],
    },
    {
      id: 'error',
      from: ['in_progress'],
      to: ['ready'],
    },
  ]);
}


export function update(machine, fluxAction) {
  let payload = fluxAction.payload || fluxAction,
    state = payload.state || payload,
    data = payload.data || null;
    
  return machine.goto(state, data);
}
