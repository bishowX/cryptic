import { usePortfolio } from "context/PortfolioContext";
import { useEffect } from "react";
import { useAuth } from "context/AuthContext";

const Portfolio = () => {
  const {
    state: {
      portfolio: { loading, error, data },
    },
    dispatch,
    getPortfolio,
  } = usePortfolio();

  const {
    state: { user, loading: userLoading },
  } = useAuth();

  useEffect(() => {
    if (!userLoading) getPortfolio(dispatch, user.uid);
  }, [userLoading]);

  return (
    <div>
      <h1>Portfolio</h1>
      <h2>Your investment in coin</h2>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        data.coins.map((coin) => (
          <div key={coin.symbol} style={{ display: "flex", gap: "1rem" }}>
            <h1>{coin.symbol}</h1>
            <h1>{coin.quantity}</h1>
          </div>
        ))
      )}
      <h3>Total: {data?.totalAmount}</h3>
    </div>
  );
};

export default Portfolio;
