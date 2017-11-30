import { List } from 'immutable';
import CardUtils from './card';

export default class HandUtils {
  static getMaxHandValue(hand) {
    return hand.reduce((sum, card) => sum += CardUtils.getCardValue(card), 0);
  }
}
