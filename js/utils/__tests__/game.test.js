import HandUtils from '../hand';
import GameUtils from '../game';
import { List } from 'immutable';

const blackjack = HandUtils.generateHand(['A', 'K']);
const five = HandUtils.generateHand(['2', '3']);
const fifteen = HandUtils.generateHand(['10', '5']);
const twenty = HandUtils.generateHand(['J', 'Q']);
const twentyone = HandUtils.generateHand(['4', '6', 'A']);
const bust = HandUtils.generateHand(['10', '6', '7']);

const expectScoreToBe = (player, dealer, score) => {
  expect(GameUtils.scoreRound(player, dealer)).toEqual(GameUtils.HAND_RESULTS[score]);
}

describe('scoreRound()', () => {
  it('pushes when dealer and player both have blackjack', () => {
    expectScoreToBe(blackjack, blackjack, 'PUSH');
  });

  it('loses when dealer has blackjack and player doesn\'t', () => {
    expectScoreToBe(five, blackjack, 'LOSE');
    expectScoreToBe(twentyone, blackjack, 'LOSE');
    expectScoreToBe(twenty, blackjack, 'LOSE');
  });

  it('wins blackjack when player has blackjack and dealer doesn\'t', () => {
    expectScoreToBe(blackjack, five, 'BLACKJACK');
    expectScoreToBe(blackjack, fifteen, 'BLACKJACK');
    expectScoreToBe(blackjack, twenty, 'BLACKJACK');
    expectScoreToBe(blackjack, twentyone, 'BLACKJACK');
  });

  it('loses when player busts, even if dealer busts', () => {
    expectScoreToBe(bust, bust, 'LOSE');
    expectScoreToBe(bust, twenty, 'LOSE');
    expectScoreToBe(bust, twentyone, 'LOSE');
  });

  it('wins when dealer busts and player doesn\'t', () => {
    expectScoreToBe(five, bust, 'WIN');
    expectScoreToBe(fifteen, bust, 'WIN');
    expectScoreToBe(twenty, bust, 'WIN');
    expectScoreToBe(twentyone, bust, 'WIN');
  });

  it('pushes when dealer and player tie', () => {
    expectScoreToBe(five, five, 'PUSH');
    expectScoreToBe(fifteen, fifteen, 'PUSH');
    expectScoreToBe(twenty, twenty, 'PUSH');
    expectScoreToBe(twentyone, twentyone, 'PUSH');
  });

  it('loses when dealer has higher than player', () => {
    expectScoreToBe(five, fifteen, 'LOSE');
    expectScoreToBe(five, twentyone, 'LOSE');
    expectScoreToBe(fifteen, twenty, 'LOSE');
    expectScoreToBe(fifteen, twentyone, 'LOSE');
    expectScoreToBe(twenty, twentyone, 'LOSE');
  });

  it('wins when dealer has lower than player', () => {
    expectScoreToBe(fifteen, five, 'WIN');
    expectScoreToBe(twentyone, five, 'WIN');
    expectScoreToBe(twenty, fifteen, 'WIN');
    expectScoreToBe(twentyone, fifteen, 'WIN');
    expectScoreToBe(twentyone, twenty, 'WIN');
  });
});
