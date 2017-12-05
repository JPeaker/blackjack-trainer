import { List } from 'immutable';

export default {
  playerHand: List(),
  dealerHand: List(),
  dealerDrawing: false,
  bank: 10000,
  rules: {
    numberOfDecks: 8
  },
  shoe: List(),
  shoeComplete: true,
  stood: false
}