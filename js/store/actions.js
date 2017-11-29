export const INITIALIZE_SHOE = 'INITIALIZE_SHOE';
export const DRAW_PLAYER_CARD = 'DRAW_PLAYER_CARD';

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