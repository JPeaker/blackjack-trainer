import CardUtils from './card';

export default class HandUtils {
  static generateHand(hand) {
    return hand.map(card => CardUtils.generateCard(card));
  }

  static getMaxHandValue(hand) {
    return hand.reduce((sum, card) => sum + CardUtils.getCardValue(card), 0);
  }

  static getHandValue(hand) {
    let maxHandValue = HandUtils.getMaxHandValue(hand);
    let numberOfAces = hand
      .map(card => card.rank === 'A')
      .reduce((sum, isAce) => sum + Number(isAce), 0);

    while (maxHandValue > 21 && numberOfAces > 0) {
      numberOfAces -= 1;
      maxHandValue -= 10;
    }

    return maxHandValue;
  }

  static isBlackjack(hand) {
    return hand.size === 2 && HandUtils.getHandValue(hand) === 21;
  }
}
