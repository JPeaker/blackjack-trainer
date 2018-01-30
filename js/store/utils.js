import { List } from 'immutable';
import defaultState from './default-state';

export default class StoreUtils {
  static generateTestStore(
    hands = defaultState.playerHands,
    currentPlayerHand = defaultState.currentPlayerHand,
    dealerHand = defaultState.dealerHand,
    shoe = defaultState.shoe
  ) {
    return Object.assign({}, defaultState, {
      playerHands: List(hands),
      currentPlayerHand,
      dealerHand,
      shoe
    });
  }

  static getPlayerHand(store, index = store.currentPlayerHand) {
    return store.playerHands.get(index);
  }

  static getPreviousPlayerHand(store) {
    if (store.currentPlayerHand === 0) {
      throw Error('Cannot get previous hand, only on hand 0');
    }

    return store.playerHands.get(store.currentPlayerHand - 1);
  }

  static setPlayerHandInList(store, changeTo) {
    return store.playerHands.set(store.currentPlayerHand, changeTo);
  }

  static addCardToPlayerHand(store, card) {
    return StoreUtils.setPlayerHandInList(
      store,
      Object.assign(
        {},
        StoreUtils.getPlayerHand(store),
        { cards: StoreUtils.getPlayerHand(store).cards.push(card) }
      )
    );
  }

  static standPlayerHand(store) {
    return StoreUtils.setPlayerHandInList(
      store,
      Object.assign({}, StoreUtils.getPlayerHand(store), { stood: true })
    );
  }

  static standDealerHand(store) {
    return Object.assign({}, store.dealerHand, {
      stood: true
    });
  }

  static allPlayerHandsStood(store) {
    return store.playerHands.reduce(
      (allStoodSoFar, hand) => allStoodSoFar && hand.stood,
      true
    );
  }
}
