import { getTimerValue, nextQuestion, TIMEOUT } from '../action/actions';

const INITIAL_STATE = {
  timeIsOver: false,
  timerValue: 30,
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
  case nextQuestion:
    return {
      ...state,
      timerValue: 30,
      timeIsOver: false,
    };
  default:
    return state;
  }
};

export default time;
