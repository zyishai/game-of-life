import { combineReducers } from 'redux';
import gameStateReducer from '../features/game/gameStateSlice';

export default combineReducers({
  gameState: gameStateReducer,
});
