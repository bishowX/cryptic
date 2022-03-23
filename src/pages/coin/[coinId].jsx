import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCoin } from "context/CoinContext";

const CoinDetail = () => {
  const {
    state: { coin },
    getCoinDetail,
    dispatch,
  } = useCoin();

  const router = useRouter();

  const { coinId } = router.query;

  useEffect(() => {
    if (coinId) getCoinDetail(dispatch, coinId);
  }, [coinId]);

  return (
    <div>
      <h1> Detail of {coinId}</h1>
      {coin.error && <h3>Error: {coin.error}</h3>}
      {coin.loading && <h3>loading...</h3>}
      {coin.data?.asset_id && <h2>{JSON.stringify(coin.data)}</h2>}
    </div>
  );
};

export default CoinDetail;
