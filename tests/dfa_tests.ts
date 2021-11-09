/* eslint-disable node/no-unpublished-import */
import {DFA} from '../src/dfa/dfa';

import {expect} from 'chai';

const acceptEmptySpec = {
  transitions: {},
  accept_states: ['S1'],
  start_state: 'S1',
};

const rejectEverythingSpec = {
  transitions: {},
  accept_states: [],
  start_state: 'S1',
};

const acceptAtLeastOneOneSpec = {
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
};

const acceptEndInOneSpec = {
  transitions: {
    S1: {
      '0': 'S1',
      '1': 'S2',
    },
    S2: {
      '0': 'S1',
      '1': 'S2',
    },
  },
  accept_states: ['S2'],
  start_state: 'S1',
};

describe('DFA tests', () => {
  it('can accept inputs', () => {
    const acceptEmptyDfa = new DFA(acceptEmptySpec);

    expect(acceptEmptyDfa.accepts('')).to.equal(true);
  });

  it('can reject inputs', () => {
    const rejectEverythingDfa = new DFA(rejectEverythingSpec);

    expect(rejectEverythingDfa.accepts('')).to.equal(false);
  });

  it('can accept non-empty inputs', () => {
    const acceptAtLeastOneOneDfa = new DFA(acceptAtLeastOneOneSpec);

    expect(acceptAtLeastOneOneDfa.accepts('')).to.equal(false);
    expect(acceptAtLeastOneOneDfa.accepts('1')).to.equal(true);
    expect(acceptAtLeastOneOneDfa.accepts('1111')).to.equal(true);
  });

  it('can accept some inputs and reject others', () => {
    const acceptEndInOneDfa = new DFA(acceptEndInOneSpec);

    expect(acceptEndInOneDfa.accepts('0001')).to.equal(true);
    expect(acceptEndInOneDfa.accepts('011001')).to.equal(true);
    expect(acceptEndInOneDfa.accepts('1001')).to.equal(true);
    expect(acceptEndInOneDfa.accepts('010')).to.equal(false);
    expect(acceptEndInOneDfa.accepts('11000')).to.equal(false);
  });

  it('implicitly rejects unsupported symbols', () => {
    const acceptEndInOneDfa = new DFA(acceptEndInOneSpec);

    expect(acceptEndInOneDfa.accepts('321')).to.equal(false);
  });
});
