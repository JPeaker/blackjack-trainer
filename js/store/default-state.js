import { List } from 'immutable';

export default {
  player: {
    cards: List(),
    stood: false
  },
  dealer: {
    cards: List(),
    stood: false
  },
  shoe: {
    cards: List()
  },
  game: {
    bank: 10000
  },
  rules: {
    numberOfDecks: 8
  }
}