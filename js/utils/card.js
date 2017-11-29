import { List } from 'immutable';

export default class CardUtils {
  static get ranks() {
    return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  }

  static get suits() {
    return ['clubs', 'diamonds', 'hearts','spades'];
  }

  static shuffle(list) {
    let newList = list;
    for (let i = list.size - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tempVar = newList.get(i);
        newList = newList.set(i, newList.get(j));
        newList = newList.set(j, tempVar);
    }

    return newList;
  }

  static generateDeck() {
    const newDeck = [];
    for (var rank = 0; rank < CardUtils.ranks.length; rank++) {
      for (var suit = 0; suit < CardUtils.suits.length; suit++) {
        newDeck.push({ rank: CardUtils.ranks[rank], suit: CardUtils.suits[suit] });
      }
    }

    return List(newDeck);
  }

  static generateShoe(numberOfDecks) {
    let newShoe = List();
    for (var i = 0; i < numberOfDecks; i++) {
      newShoe = newShoe.concat(CardUtils.generateDeck());
    }

    return CardUtils.shuffle(newShoe);
  }
}
