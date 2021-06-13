import actions from "./actions";

const initialState = {
  user: {},
  token: "",
  playlistId: "",
  likedSongs: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actions.LOGIN:
      return state;
    case actions.SET_USER:
      return { ...state, ...payload.data };
    case actions.SET_TOKEN:
      return { ...state, token: payload.data };
    case actions.SET_PLAYLIST_ID:
      return { ...state, playlistId: payload.data };
    case actions.SET_LIKED_SONGS:
      return { ...state, likedSongs: [...payload] };
    default:
      return state;
  }
};

export default reducer;
