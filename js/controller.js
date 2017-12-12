import {
  drawDealerCard,
  initializeShoe,
  stand,
  standDealer,
  startNewHand
} from './store/actions';
import HandUtils from './utils/hand';

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

    if (!this.state.playerStood) {
      if (HandUtils.getHandValue(this.state.playerCards) >= 21) {
        this.dispatch(stand());
      }

      return;
    }

    if (this.state.dealerStood) {
      return;
    }

    if (this.state.playerStood && HandUtils.getHandValue(this.state.dealerCards) < 17) {
      this.dispatch(drawDealerCard());

      return;
    }

    this.dispatch(standDealer());
  }
}

export default Controller;