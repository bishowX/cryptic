import { initialPortfolioState } from "initialState";
import { createContext, useContext, useReducer } from "react";
import { portfolioReducer } from "reducers/portfolioReducer";
import { getPortfolio } from "actions/portfolioActions";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);

  const value = {
    state,
    dispatch,
    getPortfolio,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export default PortfolioProvider;
