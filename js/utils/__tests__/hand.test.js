import CardUtils from '../card';
import HandUtils from '../hand';
import { List } from 'immutable';

const expectMaxHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getMaxHandValue(listOfRanks.map((rank) => CardUtils.generateCard(rank)))
  ).toEqual(toBe);
}

const expectHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getHandValue(listOfRanks.map((rank) => CardUtils.generateCard(rank)))
  ).toEqual(toBe);
};

describe('getMaxHandValue()', () => {
  it('values empty hand as 0', () => {
    expectMaxHandValueOfToBe([], 0);
  });

  it('values single card hands correctly', () => {
    expectMaxHandValueOfToBe(['A'], 11);
    expectMaxHandValueOfToBe(['J'], 10);
    expectMaxHandValueOfToBe(['2'], 2);
  });

  it('values two card hands correctly', () => {
    expectMaxHandValueOfToBe(['A', '4'], 15);
    expectMaxHandValueOfToBe(['A', 'Q'], 21);
    expectMaxHandValueOfToBe(['2', '3'], 5);
    expectMaxHandValueOfToBe(['4', '10'], 14);
  });

  it('values many card hands correctly', () => {
    expectMaxHandValueOfToBe(['A', '2', '3', '4', '5', '6'], 31);
    expectMaxHandValueOfToBe(['Q', 'J', 'K'], 30);
    expectMaxHandValueOfToBe(['Q', '10', '4', '7'], 31);
  });
});

describe('getHandValue()', () => {
  it('values empty hand', () => {
    expectHandValueOfToBe([], 0);
  });

  it('values single card hand', () => {
    expectHandValueOfToBe(['A'], 11);
    expectHandValueOfToBe(['J'], 10);
    expectHandValueOfToBe(['7'], 7);
  });

  it('values hard hands', () => {
    expectHandValueOfToBe(['10', '4'], 14);
    expectHandValueOfToBe(['2', '6'], 8);
    expectHandValueOfToBe(['J', 'Q'], 20);
  });

  it('values soft hands', () => {
    expectHandValueOfToBe(['A', 'A'], 12);
    expectHandValueOfToBe(['A', '2'], 13);
    expectHandValueOfToBe(['3', 'A'], 14);
    expectHandValueOfToBe(['A', 'K'], 21);
    expectHandValueOfToBe(['A', '4', 'A'], 16);
    expectHandValueOfToBe(['5', 'A', 'A', 'A'], 18);
  });
});
