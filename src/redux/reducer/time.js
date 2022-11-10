import { TIMEOUT } from '../action/actions';

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
  default:
    return state;
  }
};

export default time;
