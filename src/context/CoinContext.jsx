import initialCoinState from "initialState/initialCoinState";
import { createContext, useContext, useReducer } from "react";
import coinReducer from "reducers/coinReducer";
import { getCoins, getCoinDetail } from "actions/coinActions";

const CoinContext = createContext();

export const useCoin = () => useContext(CoinContext);

export const CoinProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coinReducer, initialCoinState);

  const value = { state, dispatch, getCoins, getCoinDetail };
  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};
