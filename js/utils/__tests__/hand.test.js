import CardUtils from '../card';
import HandUtils from '../hand';
import { List } from 'immutable';

describe('generateHand()', () => {
  it('generates empty hand', () => {
    expect(HandUtils.generateHand(List())).toEqual(List());
  });

  it('generates single card hand', () => {
    expect(HandUtils.generateHand(List(['5']))).toEqual(List([CardUtils.generateCard('5')]));
  });

  it('generates multiple card hand', () => {
    expect(
      HandUtils.generateHand(List(['2', '3', 'A']))
    ).toEqual(
      List([CardUtils.generateCard('2'), CardUtils.generateCard('3'), CardUtils.generateCard('A')])
    );
  });
});

const expectMaxHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getMaxHandValue(List(listOfRanks.map((rank) => CardUtils.generateCard(rank))))
  ).toEqual(toBe);
}

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

const expectHandValueOfToBe = (listOfRanks, toBe) => {
  expect(
    HandUtils.getHandValue(List(listOfRanks.map((rank) => CardUtils.generateCard(rank))))
  ).toEqual(toBe);
};

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
    expectHandValueOfToBe(['A', '6', '6', '5'], 18);
  });
});

const expectIsBlackjackToBe = (hand, isBlackjack) => {
  expect(HandUtils.isBlackjack(List(HandUtils.generateHand(hand)))).toEqual(isBlackjack);
};

describe('isBlackjack()', () => {
  it('identifies blackjack', () => {
    expectIsBlackjackToBe(['A', '10'], true);
    expectIsBlackjackToBe(['A', 'J'], true);
    expectIsBlackjackToBe(['A', 'Q'], true);
    expectIsBlackjackToBe(['A', 'K'], true);
    expectIsBlackjackToBe(['10', 'A'], true);
    expectIsBlackjackToBe(['J', 'A'], true);
    expectIsBlackjackToBe(['Q', 'A'], true);
    expectIsBlackjackToBe(['K', 'A'], true);
  });

  it('identifies non-blackjack', () => {
    expectIsBlackjackToBe([], false);
    expectIsBlackjackToBe(['4'], false);
    expectIsBlackjackToBe(['A'], false);
    expectIsBlackjackToBe(['J'], false);
    expectIsBlackjackToBe(['Q'], false);
    expectIsBlackjackToBe(['K'], false);
    expectIsBlackjackToBe(['10'], false);
    expectIsBlackjackToBe(['10', '10'], false);
    expectIsBlackjackToBe(['10', 'J'], false);
    expectIsBlackjackToBe(['10', 'K'], false);
    expectIsBlackjackToBe(['A', '9'], false);
    expectIsBlackjackToBe(['A', '2'], false);
    expectIsBlackjackToBe(['4', '7'], false);
    expectIsBlackjackToBe(['7', '7'], false);
    expectIsBlackjackToBe(['9', '8', '4'], false);
  });
});
