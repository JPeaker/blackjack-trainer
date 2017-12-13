export default class StoreUtils {
  static getPlayerHand(store, index = store.currentPlayerHand) {
    return store.playerHands.get(index);
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
