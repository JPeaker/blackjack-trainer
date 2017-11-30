import CardUtils from '../card';
import { List } from 'immutable';

describe('generateCard', () => {
  it('generates card with specified suit', () => {
    expect(CardUtils.generateCard('A', 'spades')).toEqual({ rank: 'A', suit: 'spades' });
    expect(CardUtils.generateCard('K', 'clubs')).toEqual({ rank: 'K', suit: 'clubs' });
    expect(CardUtils.generateCard('10', 'diamonds')).toEqual({ rank: '10', suit: 'diamonds' });
    expect(CardUtils.generateCard('2', 'hearts')).toEqual({ rank: '2', suit: 'hearts' });
  });

  it('generates card with unspecified suit', () => {
    expect(CardUtils.generateCard('3')).toEqual({ rank: '3', suit: 'spades' });
  });

  it('throws error on incorrect rank', () => {
    expect(CardUtils.generateCard.bind(null, 'F', 'spades')).toThrowError('Invalid card rank');
  });

  it('throws error on incorrect suit', () => {
    expect(CardUtils.generateCard.bind(null, '4', 'blah')).toThrowError('Invalid card suit');
  });
});

it('generates deck correctly', () => {
  const deck = CardUtils.generateDeck();
  expect(deck.size).toEqual(52);

  const rankCounter = new Array(13).fill(0);
  const suitCounter = new Array(4).fill(0);

  deck.forEach((card) => {
    rankCounter[CardUtils.ranks.indexOf(card.rank)] += 1;
    suitCounter[CardUtils.suits.indexOf(card.suit)] += 1;
  });

  // Each rank should appear 4 times
  for (var rankIndex = 0; rankIndex < rankCounter.length; rankIndex++) {
    expect(rankCounter[rankIndex]).toEqual(4);
  }

  // Each suit should appear 13 times
  for (var suitIndex = 0; suitIndex < suitCounter.length; suitIndex++) {
    expect(suitCounter[suitIndex]).toEqual(13);
  }
});

// Assuming generate deck works correctly, we need only check the number of cards here
// But generateShoe gives an immutable List, so check the size
it('generates shoe correctly', () => {
  for (var numberOfShoes = 1; numberOfShoes < 4; numberOfShoes++) {
    expect(CardUtils.generateShoe(numberOfShoes).size).toEqual(numberOfShoes * 52);
  }
});

describe('getCardValue()', () => {
  const valueStringAsValue = (str, value) => {
    it(`values ${str} as ${value}`, () => {
      expect(CardUtils.getCardValue({ rank: str, suit: 'hearts' })).toEqual(value);
    });
  }

  valueStringAsValue('A', 11);
  valueStringAsValue('2', 2);
  valueStringAsValue('3', 3);
  valueStringAsValue('4', 4);
  valueStringAsValue('5', 5);
  valueStringAsValue('6', 6);
  valueStringAsValue('7', 7);
  valueStringAsValue('8', 8);
  valueStringAsValue('9', 9);
  valueStringAsValue('10', 10);
  valueStringAsValue('J', 10);
  valueStringAsValue('Q', 10);
  valueStringAsValue('K', 10);
});
