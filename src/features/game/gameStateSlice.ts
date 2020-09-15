import { createSlice } from '@reduxjs/toolkit';
import { GameState } from './gameState';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: GameState.PENDING,
  reducers: {
    startGame() {
      return GameState.STARTED;
    },
    endGame(_, action) {
      return action.payload;
    },
    clearState() {
      return GameState.PENDING;
    },
  },
});

export const { startGame, endGame, clearState } = gameStateSlice.actions;
export default gameStateSlice.reducer;
