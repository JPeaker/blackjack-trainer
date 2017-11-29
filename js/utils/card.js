export default class CardUtils {
  static get ranks() {
    return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  }

  static get suits() {
    return ['clubs', 'diamonds', 'hearts','spades'];
  }

  static shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }

  static generateDeck() {
    const newDeck = [];
    for (var rank = 0; rank < CardUtils.ranks.length; rank++) {
      for (var suit = 0; suit < CardUtils.suits.length; suit++) {
        newDeck.push({ rank: CardUtils.ranks[rank], suit: CardUtils.suits[suit] });
      }
    }

    return newDeck;
  }

  static generateShoe(numberOfDecks) {
    var newShoe = [];
    for (var i = 0; i < numberOfDecks; i++) {
      newShoe = newShoe.concat(CardUtils.generateDeck());
    }

    return CardUtils.shuffle(newShoe);
  }
}
