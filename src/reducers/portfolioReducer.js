import { LOAD_PORTFOLIO_LOADING, LOAD_PORTFOLIO_SUCCESS, LOAD_PORTFOLIO_ERROR } from "actionTypes";

export const portfolioReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PORTFOLIO_LOADING:
      return {
        ...state,
        portfolio: { loading: true, error: null },
      };

    case LOAD_PORTFOLIO_SUCCESS:
      return { ...state, portfolio: { loading: false, error: null, data: action.payload } };

    case LOAD_PORTFOLIO_ERROR:
      return { ...state, portfolio: { loading: false, error: action.payload } };

    default:
      return state;
  }
};
