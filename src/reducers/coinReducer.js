import { LOAD_COINS_ERROR, LOAD_COINS_LOADING, LOAD_COINS_SUCCESS } from "actionTypes";

const coinReducer = (state, action) => {
  switch (action.type) {
    case LOAD_COINS_LOADING:
      return { ...state, coins: { ...state.coins, loading: true, error: null } };
    case LOAD_COINS_SUCCESS:
      return { ...state, coins: { loading: false, error: null, data: action.payload } };
    case LOAD_COINS_ERROR:
      return { ...state, coins: { loading: false, error: action.payload } };
    default:
      return state;
  }
};

export default coinReducer;
