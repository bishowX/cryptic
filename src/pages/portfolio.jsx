import { usePortfolio } from "context/PortfolioContext";
import { useEffect } from "react";
import { useAuth } from "context/AuthContext";
import withAuth from "components/withAuth";

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
      {error && <h3>{error}</h3>}
      {loading && <h3>loading...</h3>}
      {data?.coins && (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Bought At</th>
            </tr>
          </thead>
          <tbody>
            {data?.coins?.map((coin) => (
              <tr key={coin.symbol}>
                <td>{coin.symbol}</td>
                <td>{coin.quantity}</td>
                <td>{coin.boughtPrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{data.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default withAuth(Portfolio);
