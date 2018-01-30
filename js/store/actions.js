export const INITIALIZE_SHOE = 'INITIALIZE_SHOE';
export const DRAW_PLAYER_CARD = 'DRAW_PLAYER_CARD';
export const DRAW_DEALER_CARD = 'DRAW_DEALER_CARD';
export const DOUBLE = 'DOUBLE';
export const SPLIT = 'SPLIT';
export const STAND = 'STAND';
export const START_NEW_HAND = 'START_NEW_HAND';
export const STAND_DEALER = 'STAND_DEALER';
export const REWARD_PLAYER = 'REWARD_PLAYER';

export function initializeShoe() {
  return {
    type: INITIALIZE_SHOE
  };
}

export function drawPlayerCard() {
  return {
    type: DRAW_PLAYER_CARD
  };
}

export function drawDealerCard() {
  return {
    type: DRAW_DEALER_CARD
  };
}

export function stand() {
  return {
    type: STAND
  };
}

export function standDealer() {
  return {
    type: STAND_DEALER
  };
}

export function startNewHand() {
  return {
    type: START_NEW_HAND
  };
}

export function rewardPlayer(roundResult, handIndex) {
  return {
    type: REWARD_PLAYER,
    roundResult,
    handIndex
  };
}

export function doubleHand() {
  return {
    type: DOUBLE
  };
}

export function split() {
  return {
    type: SPLIT
  }
}