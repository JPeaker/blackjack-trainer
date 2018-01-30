import CardUtils from './card';
import HandUtils from './hand';

export default class GameUtils {
  static get HAND_RESULTS() {
    return {
      LOSE: 'LOSE',
      PUSH: 'PUSH',
      WIN: 'WIN',
      BLACKJACK: 'BLACKJACK'
    };
  }

  static scoreRound(player, dealer) {
    const playerValue = HandUtils.getHandValue(player);
    const playerIsBlackjack = HandUtils.isBlackjack(player);
    const dealerValue = HandUtils.getHandValue(dealer);
    const dealerIsBlackjack = HandUtils.isBlackjack(dealer);

    if (dealerIsBlackjack) {
      if (playerIsBlackjack) {
        return GameUtils.HAND_RESULTS.PUSH;
      }

      return GameUtils.HAND_RESULTS.LOSE;
    }

    if (playerIsBlackjack) {
      return GameUtils.HAND_RESULTS.BLACKJACK;
    }

    if (playerValue > 21) {
      return GameUtils.HAND_RESULTS.LOSE;
    }

    if (dealerValue > 21) {
      return GameUtils.HAND_RESULTS.WIN;
    }

    if (dealerValue === playerValue) {
      return GameUtils.HAND_RESULTS.PUSH;
    }

    if (dealerValue < playerValue) {
      return GameUtils.HAND_RESULTS.WIN;
    }

    return GameUtils.HAND_RESULTS.LOSE;
  }
}
