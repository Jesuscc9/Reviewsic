const actions = {
  LOGIN: "USER/LOGIN",
  SET_USER: "USER/SET_USER",
  SET_PLAYLIST_ID: "USER/SET_PLAYLIST_ID",
  SET_LIKED_SONGS: "USER/SET_LIKED_SONGS",

  login: (data) => ({
    type: actions.LOGIN,
  }),
  setUser: (data) => ({
    type: actions.SET_USER,
    payload: { data },
  }),
  setPlaylistId: (data) => ({
    type: actions.SET_PLAYLIST_ID,
    payload: { data },
  }),
  setLikedSongs: (data) => ({
    type: actions.SET_LIKED_SONGS,
    payload: data,
  }),
};

export default actions;
