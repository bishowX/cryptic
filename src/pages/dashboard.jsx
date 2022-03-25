import { useEffect } from "react";
import withAuth from "components/withAuth";
import { getPortfolio } from "actions/portfolioActions";
import { usePortfolio } from "context/PortfolioContext";
import { useAuth } from "context/AuthContext";

const Dashboard = () => {
  const {
    state: {
      portfolio: { loading, error, data },
    },
    dispatch,
  } = usePortfolio();

  const {
    state: { user },
  } = useAuth();

  useEffect(() => {
    getPortfolio(dispatch, user.uid);
  }, []);

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <h1>Your total portfolio amount: {loading ? "loading..." : data?.totalBoughtAmount}</h1>
    </div>
  );
};

export default withAuth(Dashboard);
