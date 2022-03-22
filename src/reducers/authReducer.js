import { LOAD_USER_LOADING, LOAD_USER_SUCCESS, LOAD_USER_ERROR, USER_NOT_LOGGED_IN } from "actionTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER_LOADING:
      return { ...state, loading: true, error: null, user: null };
    case LOAD_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };
    case LOAD_USER_ERROR:
      return { ...state, loading: false, user: null, error: action.payload };
    case USER_NOT_LOGGED_IN:
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;
