import {
  LOAD_PORTFOLIO_LOADING,
  LOAD_PORTFOLIO_SUCCESS,
  LOAD_PORTFOLIO_ERROR,
  ADD_COIN_TO_PORTFOLIO_LOADING,
  ADD_COIN_TO_PORTFOLIO_SUCCESS,
  ADD_COIN_TO_PORTFOLIO_ERROR,
} from "actionTypes";

export const portfolioReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PORTFOLIO_LOADING:
      return {
        ...state,
        portfolio: { loading: true, error: null },
      };

    case LOAD_PORTFOLIO_SUCCESS:
      //if newly fetched coin is in coins array the replace old coin with new one
      const newCoins = [];
      action.payload.forEach((newCoin) => {
        state.portfolio.coins?.forEach((oldCoin) => {
          if (oldCoin.symbol === newCoin.symbol) newCoins.push(newCoin);
          else newCoins.push(oldCoin);
        });
      });
      return { ...state, portfolio: { loading: false, error: null, data: newCoins } };

    case LOAD_PORTFOLIO_ERROR:
      return { ...state, portfolio: { loading: false, error: action.payload } };

    case ADD_COIN_TO_PORTFOLIO_LOADING:
      return { ...state, addCoinToPortfolio: { ...state.addCoinToPortfolio, loading: true } };

    case ADD_COIN_TO_PORTFOLIO_SUCCESS:
      // Filter and remove coin if the newly added coin in in array
      // const filteredCoins = state.portfolio.data.coins?.filter((coin) => coin.symbol !== action.payload.symbol) || [];
      const filteredCoins = [];

      state.portfolio.data.coins?.forEach((coin) => {
        if (!coin.symbol === action.payload.symbol) filteredCoins.push(coin);
      });
      // add new coin to the coins array
      filteredCoins.push(action.payload);
      console.log(filteredCoins);
      console.log("Action payload ", action.payload);
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          data: { ...state.portfolio.data, coins: [...filteredCoins] },
        },
        addCoinToPortfolio: { ...state.addCoinToPortfolio, loading: false, error: null, data: action.payload },
      };

    case ADD_COIN_TO_PORTFOLIO_ERROR:
      console.log("error", action.payload);
      return { ...state, addCoinToPortfolio: { ...state.addCoinToPortfolio, loading: false, error: action.payload } };

    default:
      return state;
  }
};
