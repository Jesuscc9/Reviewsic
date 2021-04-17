import actions from './actions'

const initialState = {
  author_id: ''
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch(type){
    case actions.LOGIN: 
      return state;
    case actions.SET_USER:
      console.log(action)
      return {...state, author_id: payload.data};
    default: 
      return state;
  }
}

export default reducer;