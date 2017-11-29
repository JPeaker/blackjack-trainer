import CardUtils from '../card';
import { List } from 'immutable';

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
