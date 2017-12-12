import { List } from 'immutable';

export default {
  playerCards: List(),
  dealerCards: List(),
  shoe: List(),
  playerStood: false,
  dealerStood: false,
  numberOfDecks: 1,
  bank: 10000
}