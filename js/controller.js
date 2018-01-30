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

    if (
      HandUtils.isBlackjack(this.state.dealerHand) &&
      !StoreUtils.allPlayerHandsStood(this.state)
    ) {
      this.dispatch(stand());
      return;
    }
    console.log(StoreUtils.allPlayerHandsStood(this.state));
    if (!StoreUtils.allPlayerHandsStood(this.state)) {
      if (HandUtils.getHandValue(StoreUtils.getPlayerHand(this.state)) >= 21) {
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
    this.state.playerHands.forEach(hand => {
      console.log(`REWARD! ${GameUtils.scoreRound(hand, this.state.dealerHand)}`);
      this.dispatch(rewardPlayer(GameUtils.scoreRound(hand, this.state.dealerHand)));
    });
  }
}

export default Controller;