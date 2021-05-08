const actions = {
  LOGIN: "USER/LOGIN",
  SET_USER: "USER/SET_USER",
  SET_LIKED_SONGS: "USER/SET_LIKED_SONGS",

  login: (data) => ({
    type: actions.LOGIN,
  }),
  setUser: (data) => ({
    type: actions.SET_USER,
    payload: { data },
  }),
  setLikedSongs: (data) => ({
    type: actions.SET_LIKED_SONGS,
    payload: data,
  }),
};

export default actions;
