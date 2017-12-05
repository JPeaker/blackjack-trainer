export const INITIALIZE_SHOE = 'INITIALIZE_SHOE';
export const DRAW_PLAYER_CARD = 'DRAW_PLAYER_CARD';
export const DRAW_DEALER_CARD = 'DRAW_DEALER_CARD';
export const STAND = 'STAND';
export const START_NEW_HAND = 'START_NEW_HAND';
export const STOP_DEALER_DRAWING = 'STOP_DEALER_DRAWING';

export function initializeShoe() {
  return {
    type: INITIALIZE_SHOE
  };
};

export function drawPlayerCard() {
  return {
    type: DRAW_PLAYER_CARD
  };
};

export function drawDealerCard() {
  return {
    type: DRAW_DEALER_CARD
  };
};

export function stand() {
  return {
    type: STAND
  };
};

export function stopDealerDrawing() {
  return {
    type: STOP_DEALER_DRAWING
  };
};

export function startNewHand() {
  return {
    type: START_NEW_HAND
  };
};
