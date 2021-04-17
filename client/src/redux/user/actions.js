const actions = {
  LOGIN: 'USER/LOGIN',
  SET_USER: 'USER/SET_USER',

  login: (data) => ({
    type: actions.LOGIN,
  }),
  setUser: (data) => ({
    type: actions.SET_USER,
    payload: {data},
  })  
}

export default actions;