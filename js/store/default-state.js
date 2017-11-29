import { List } from 'immutable';

export default {
  playerHand: List(),
  dealerHand: List(),
  bank: 10000,
  rules: {
    numberOfDecks: 8
  },
  shoe: List(),
  shoeComplete: true
}