const actions = {
  SET_REVIEWS: "DATA/SET_REVIEWS",
  ADD_REVIEW: "DATA/ADD_REVIEW",
  UPDATE_REVIEW: "DATA/UPDATE_REVIEW",
  DELETE_REVIEW: "DATA/DELETE_REVIEW",
  SET_LIKES: "DATA/SET_LIKES",
  SET_QUALIFICATIONS: "DATA/SET_QUALIFICATIONS",

  setReviews: (reviews) => ({
    type: actions.SET_REVIEWS,
    payload: reviews,
  }),
  addReview: (review) => ({
    type: actions.ADD_REVIEW,
    payload: review,
  }),
  updateReview: (newReview) => ({
    type: actions.UPDATE_REVIEW,
    payload: newReview,
  }),
  deleteReview: (id) => ({
    type: actions.DELETE_REVIEW,
    payload: id,
  }),
  setLikes: (likes) => ({
    type: actions.SET_LIKES,
    payload: likes,
  }),
  setQualifications: (qualifications) => ({
    type: actions.SET_QUALIFICATIONS,
    payload: qualifications,
  }),
};

export default actions;
