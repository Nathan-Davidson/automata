A deterministic finite automation implementation in TypeScript. A simplified representation of the
DFA is used for convenience. The state set and alphabet are assumed to be implicitly defined from 
the transitions, start state, and accept state(s). For example, a DFA to match non-empty strings of
1s might be represented as:

    {
      transitions: {
        S1: {
          '1': 'S2',
        },
        S2: {
          '1': 'S2',
        },
      },
      accept_states: ['S2'],
      start_state: 'S1',
    }