import withAuth from "@/components/withAuth";
import { getPortfolio } from "actions/portfolioActions";
import { usePortfolio } from "context/PortfolioContext";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    state: {
      portfolio: { loading, error, data },
    },
    dispatch,
  } = usePortfolio();

  useEffect(() => {
    getPortfolio(dispatch);
  }, []);

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <h1>Your total portfolio amount: {loading ? "loading..." : data?.totalAmount}</h1>
    </div>
  );
};

export default withAuth(Dashboard);
