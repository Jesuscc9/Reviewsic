import actions from "./actions";

const initialState = {
  token: "",
  author_id: "",
  playlist_id: "",
  likedSongs: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actions.LOGIN:
      return state;
    case actions.SET_USER:
      return { ...state, author_id: payload.data };
    case actions.SET_TOKEN:
      return { ...state, token: payload.data };
    case actions.SET_PLAYLIST_ID:
      return { ...state, playlist_id: payload.data };
    case actions.SET_LIKED_SONGS:
      return { ...state, likedSongs: [...payload] };
    default:
      return state;
  }
};

export default reducer;
