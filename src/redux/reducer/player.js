import { login, updateScore } from '../action/actions';

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
  case updateScore:
    return {
      ...state,
      score: action.updatedScore,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
