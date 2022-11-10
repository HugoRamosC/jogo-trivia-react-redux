export const login = 'login';
export const TIMEOUT = 'TIMEOUT';
export const updateScore = 'updateScore';
export const getTimerValue = 'getTimerValue';
export const nextQuestion = 'nextQuestion';

export const actionLogin = (state) => ({
  type: login,
  emailLogin: state.email,
  name: state.name,
});

export const finishTime = () => ({
  type: TIMEOUT,
});

export const getTimer = (time) => ({
  type: getTimerValue,
  time,
});

export const actionNextQuestion = () => ({
  type: nextQuestion,
});

export const actionUpdateScore = (updatedScore) => ({
  type: updateScore,
  updatedScore,
});
