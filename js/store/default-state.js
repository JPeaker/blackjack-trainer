import { List } from 'immutable';

export default {
  playerHands: List([{
    cards: List(),
    stood: false,
    bet: 10
  }]),
  currentPlayerHand: 0,
  dealerHand: {
    cards: List(),
    stood: false
  },
  shoe: List(),
  numberOfDecks: 8,
  bank: 10000,
  betSize: 10
};
