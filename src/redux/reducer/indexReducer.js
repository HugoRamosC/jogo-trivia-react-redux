import { combineReducers } from 'redux';
import player from './player';
import time from './time';

const rootReducer = combineReducers({
  player,
  time,
});

export default rootReducer;
