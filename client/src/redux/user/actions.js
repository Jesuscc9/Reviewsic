const actions = {
  LOGIN: "USER/LOGIN",
  SET_USER: "USER/SET_USER",
  SET_TOKEN: "USER/SET_TOKEN",
  SET_PLAYLIST_ID: "USER/SET_PLAYLIST_ID",
  SET_SAVED_SONGS: "USER/SET_SAVED_SONGS",

  login: (data) => ({
    type: actions.LOGIN,
  }),
  setUser: (data) => ({
    type: actions.SET_USER,
    payload: { data },
  }),
  setToken: (data) => ({
    type: actions.SET_TOKEN,
    payload: { data },
  }),
  setPlaylistId: (data) => ({
    type: actions.SET_PLAYLIST_ID,
    payload: { data },
  }),
  setSavedSongs: (data) => ({
    type: actions.SET_SAVED_SONGS,
    payload: data,
  }),
};

export default actions;
