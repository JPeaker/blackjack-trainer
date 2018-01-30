import {
  drawDealerCard,
  initializeShoe,
  stand,
  standDealer,
  startNewHand,
  rewardPlayer
} from './store/actions';
import HandUtils from './utils/hand';
import GameUtils from './utils/game';
import StoreUtils from './store/utils';

class Controller {
  constructor(store) {
    this.store = store;
    this.oldState = null;
    this.state = store.getState();
    this.dispatch = store.dispatch;

    this.step = this.step.bind(this);

    store.subscribe(this.step);

    this.dispatch(initializeShoe());
    this.dispatch(startNewHand());
  }

  step() {
    this.oldState = this.state;
    this.state = this.store.getState();

    if (!StoreUtils.allPlayerHandsStood(this.state)) {
      if (
        HandUtils.isBlackjack(this.state.dealerHand) ||
        HandUtils.getHandValue(StoreUtils.getPlayerHand(this.state)) >= 21
      ) {
        this.dispatch(stand());
      }

      return;
    }

    if (this.state.dealerHand.stood) {
      return;
    }

    if (
      StoreUtils.allPlayerHandsStood(this.state) &&
      HandUtils.getHandValue(this.state.dealerHand) < 17
    ) {
      this.dispatch(drawDealerCard());

      return;
    }

    this.dispatch(standDealer());
    this.state.playerHands.forEach((hand, index) => {
      this.dispatch(rewardPlayer(GameUtils.scoreRound(hand, this.state.dealerHand), index));
    });
  }
}

export default Controller;