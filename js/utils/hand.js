import CardUtils from './card';
import { List } from 'immutable';

export default class HandUtils {
  static generateHand(hand) {
    return {
      cards: List(hand.map(card => CardUtils.generateCard(card))),
      bet: 10,
      stood: false
    }
  }

  static getMaxHandValue(hand) {
    if (hand.cards.size === 0) {
      return 0;
    }

    return hand.cards.reduce((sum, card) => sum + CardUtils.getCardValue(card), 0);
  }

  static getHandValue(hand) {
    let maxHandValue = HandUtils.getMaxHandValue(hand);
    let numberOfAces = hand.cards
      .map(card => card.rank === 'A')
      .reduce((sum, isAce) => sum + Number(isAce), 0);

    while (maxHandValue > 21 && numberOfAces > 0) {
      numberOfAces -= 1;
      maxHandValue -= 10;
    }

    return maxHandValue;
  }

  static isBlackjack(hand) {
    return hand.cards.size === 2 && HandUtils.getHandValue(hand) === 21;
  }

  static splitHand(handIndex, hands, shoe) {
    const currentPlayerHand = hands.get(handIndex);

    return hands
      .set(handIndex, {
        cards: List([ currentPlayerHand.cards.get(0), shoe.get(0) ]),
        stood: false,
        bet: currentPlayerHand.bet
      })
      .insert(handIndex + 1, {
        cards: List([ currentPlayerHand.cards.get(1), shoe.get(1) ]),
        stood: false,
        bet: currentPlayerHand.bet
      });
  }
}
