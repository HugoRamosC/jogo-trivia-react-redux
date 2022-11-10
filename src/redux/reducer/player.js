import { login } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case login:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.emailLogin,
    };
  default:
    return state;
  }
};

export default player;
