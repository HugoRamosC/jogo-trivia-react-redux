export const login = 'login';
export const TIMEOUT = 'TIMEOUT';

export const actionLogin = (state) => ({
  type: login,
  emailLogin: state.email,
  name: state.name,
});

export const finishTime = () => ({
  type: TIMEOUT,
});
