import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCoin } from "context/CoinContext";
import { usePortfolio } from "context/PortfolioContext";
import { useAuth } from "context/AuthContext";

const CoinDetail = () => {
  const [showAddCoinToPortfolioForm, setShowAddCoinToPortfolioForm] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToPortfolio = (event) => {
    event.preventDefault();
    if (!user) return;
    addCoinToPortfolio(dispatchPortfolio, user.uid, coinId, quantity);
  };

  const toogleShowAddCoinToPortfolioForm = () => {
    setShowAddCoinToPortfolioForm(!showAddCoinToPortfolioForm);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div>
      <h1> Detail of {coinId}</h1>
      {coin.error && <h3>Error: {coin.error}</h3>}
      {coin.loading && <h3>loading...</h3>}
      {coin.data?.asset_id && (
        <div>
          <h2>{JSON.stringify(coin.data)}</h2>
          {!showAddCoinToPortfolioForm && <button onClick={toogleShowAddCoinToPortfolioForm}>Add to Portfolio</button>}
          {showAddCoinToPortfolioForm && (
            <form onSubmit={handleAddToPortfolio}>
              <label htmlFor="quantity">Quantity</label>
              <input value={quantity} onChange={handleQuantityChange} type="number" name="quantity" id="quantity" />
              <button type="submit">Add</button>
              <button onClick={toogleShowAddCoinToPortfolioForm}>Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
