import { useEffect } from "react";
import CoinTable from "components/CoinTable";
import { useCoin } from "context/CoinContext";

const Market = () => {
  const {
    state: { coins },
    getCoins,
    dispatch,
  } = useCoin();

  useEffect(() => {
    getCoins(dispatch);
  }, []);

  return (
    <div>
      <h1>Market</h1>
      {coins.error && <h1>Error: {error}</h1>}
      {coins.loading && <h3>loading...</h3>}
      {coins.data.length > 0 && <CoinTable coins={coins.data} />}
    </div>
  );
};

export default Market;
