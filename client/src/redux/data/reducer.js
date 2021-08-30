import actions from "./actions";

const initialState = {
  reviews: [],
  qualifications: [],
  likes: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actions.SET_REVIEWS:
      return { ...state, reviews: [...payload] };

    case actions.ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, payload] };

    case actions.UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) => {
          return review.id == payload.id
            ? { ...review, ...payload.data }
            : { ...review };
        }),
      };

    case actions.DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => {
          return review.id != payload.id;
        }),
      };

    case actions.SET_QUALIFICATIONS:
      return { ...state, qualifications: [...payload] };

    case actions.SET_LIKES:
      return { ...state, likes: [...payload] };

    default:
      return state;
  }
};

export default reducer;
