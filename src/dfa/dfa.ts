/* eslint-disable @typescript-eslint/no-explicit-any */
export class DFA {
  transitions: Map<string, Map<string, string>>;
  accept_states: Set<string>;
  start_state: string;

  constructor(dfa_spec_json: any) {
    this.transitions = new Map();

    for (const state in dfa_spec_json.transitions) {
      const state_transitions = new Map();
      for (const sym in dfa_spec_json.transitions[state]) {
        state_transitions.set(sym, dfa_spec_json.transitions[state][sym]);
      }
      this.transitions.set(state, state_transitions);
    }

    this.accept_states = new Set(dfa_spec_json.accept_states);
    this.start_state = dfa_spec_json.start_state;
  }

  next_state(state: string, symbol: string): string {
    const trans_for_state = this.transitions.get(state);

    if (trans_for_state === undefined) {
      throw new Error("no transitions for state '" + state + "'");
    }

    const next = trans_for_state.get(symbol);

    if (next === undefined) {
      throw new Error(
        "transition not found for symbol '" +
          symbol +
          "' in state '" +
          state +
          "'"
      );
    }

    return next;
  }

  accepts(input: string) {
    let curr_state: string = this.start_state;

    for (const char of input) {
      try {
        curr_state = this.next_state(curr_state, char);
      } catch (error) {
        return false;
      }
    }

    return this.accept_states.has(curr_state);
  }
}
