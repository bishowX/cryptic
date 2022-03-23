import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCoin } from "context/CoinContext";
import { usePortfolio } from "context/PortfolioContext";
import { useAuth } from "context/AuthContext";

const CoinDetail = () => {
  const {
    state: { coin },
    getCoinDetail,
    dispatch: dispatchCoin,
  } = useCoin();

  const {
    state: { addCoinToPortfolio: addCoinToPortfolioState },
    addCoinToPortfolio,
    dispatch: dispatchPortfolio,
  } = usePortfolio();

  const {
    state: { user },
  } = useAuth();

  const router = useRouter();

  const { coinId } = router.query;

  useEffect(() => {
    if (coinId) getCoinDetail(dispatchCoin, coinId);
  }, [coinId]);

  const handleAddToPortfolio = () => {
    if (!user) return;
    addCoinToPortfolio(dispatchPortfolio, user.uid, coinId, 200);
  };

  return (
    <div>
      <h1> Detail of {coinId}</h1>
      {coin.error && <h3>Error: {coin.error}</h3>}
      {coin.loading && <h3>loading...</h3>}
      {coin.data?.asset_id && (
        <div>
          <h2>{JSON.stringify(coin.data)}</h2>
          <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
