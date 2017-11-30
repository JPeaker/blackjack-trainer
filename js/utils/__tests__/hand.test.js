import CardUtils from '../card';
import HandUtils from '../hand';
import { List } from 'immutable';

describe('getMaxHandValue()', () => {
  it('values empty hand as 0', () => {
    expect(HandUtils.getMaxHandValue(List())).toEqual(0);
  });

  it('values single card hand as value', () => {
    expect(HandUtils.getMaxHandValue(List([CardUtils.generateCard('A')]))).toEqual(11);
    expect(HandUtils.getMaxHandValue(List([CardUtils.generateCard('J')]))).toEqual(10);
    expect(HandUtils.getMaxHandValue(List([CardUtils.generateCard('2')]))).toEqual(2);
  });
});
