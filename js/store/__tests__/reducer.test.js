import Immutable from 'immutable';
import reducer from '../reducer';
import defaultState from '../default-state';
import {
  initializeShoe
} from '../actions';

describe('INITIALIZE_SHOE', () => {
  it('should overwrite any existing shoe', () => {
    expect(
      Immutable.is(
        defaultState.shoe,
        reducer(defaultState, initializeShoe()).shoe
      )
    ).toEqual(false);
  });
});