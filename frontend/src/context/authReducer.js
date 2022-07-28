/** @format */

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    case 'USER_REGISTER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
