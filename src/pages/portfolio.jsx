import { usePortfolio } from "context/PortfolioContext";
import { useEffect } from "react";

const Portfolio = () => {
  const {
    state: {
      portfolio: { loading, error, data },
    },
    dispatch,
    getPortfolio,
  } = usePortfolio();

  useEffect(() => {
    getPortfolio(dispatch);
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Portfolio</h1>
      <h1>Your investment in coin</h1>
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
    </div>
  );
};

export default Portfolio;
