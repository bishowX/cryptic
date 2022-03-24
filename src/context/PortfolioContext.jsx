import { initialPortfolioState } from "initialState/initialPortfolioState";
import { createContext, useContext, useReducer, useEffect } from "react";
import { portfolioReducer } from "reducers/portfolioReducer";
import { getPortfolio, addCoinToPortfolio } from "actions/portfolioActions";
import { useAuth } from "context/AuthContext";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialPortfolioState);
  const {
    state: { user },
  } = useAuth();

  useEffect(() => {
    if (user) getPortfolio(dispatch, user.uid);
  }, [user]);

  const value = {
    state,
    dispatch,
    getPortfolio,
    addCoinToPortfolio,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
