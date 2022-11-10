import { getTimerValue, TIMEOUT } from '../action/actions';

const INITIAL_STATE = {
  timeIsOver: false,
};

const time = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMEOUT:
    return {
      ...state,
      timeIsOver: true,
    };
  case getTimerValue:
    return {
      ...state,
      timerValue: action.time,
    };
  default:
    return state;
  }
};

export default time;
