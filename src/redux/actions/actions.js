export const login = 'login';

export const actionLogin = (state) => ({
  type: login,
  emailLogin: state.email,
  name: state.name,
});
