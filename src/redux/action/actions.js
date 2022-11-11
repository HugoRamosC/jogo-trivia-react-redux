export const login = 'login';
export const TIMEOUT = 'TIMEOUT';
export const updateScore = 'updateScore';
export const getTimerValue = 'getTimerValue';
export const nextQuestion = 'nextQuestion';
export const resetTimerFlag = 'resetTimerFlag';
export const noResetTimerFlag = 'noResetTimerFlag';
export const clearScore = 'clearScore';

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

export const actionResetTimerFlag = () => ({
  type: resetTimerFlag,
});

export const actionNoResetTimerFlag = () => ({
  type: noResetTimerFlag,
});

export const restartScore = () => ({
  type: clearScore,
});
