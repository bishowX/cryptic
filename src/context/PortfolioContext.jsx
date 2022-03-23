import { initialPortfolioState } from "initialState/initialPortfolioState";
import { createContext, useContext, useReducer } from "react";
import { portfolioReducer } from "reducers/portfolioReducer";
import { getPortfolio, addCoinToPortfolio } from "actions/portfolioActions";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);

  const value = {
    state,
    dispatch,
    getPortfolio,
    addCoinToPortfolio,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
