import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCoin } from "context/CoinContext";
import { usePortfolio } from "context/PortfolioContext";
import { useAuth } from "context/AuthContext";
import Link from "next/link";

const CoinDetail = () => {
  const [showAddCoinToPortfolioForm, setShowAddCoinToPortfolioForm] = useState(false);
  const [showAddToPortfolioButton, setShowAddToPortfolioButton] = useState(true);
  const [showLoginLink, setShowLoginLink] = useState(false);
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

  useEffect(() => {
    if (addCoinToPortfolioState.loading) {
      setShowAddCoinToPortfolioForm(true);
    } else {
      setShowAddCoinToPortfolioForm(false);
      setShowAddToPortfolioButton(true);
    }
  }, [addCoinToPortfolioState.loading]);

  const handleAddToPortfolio = (event) => {
    event.preventDefault();

    if (!user) {
      setShowLoginLink(true);
      return;
    }
    addCoinToPortfolio(dispatchPortfolio, user.uid, coinId, quantity);
  };

  const toogleShowAddCoinToPortfolioForm = () => {
    setShowAddCoinToPortfolioForm(!showAddCoinToPortfolioForm);
    setShowAddToPortfolioButton(!showAddToPortfolioButton);
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
          {showAddToPortfolioButton && <button onClick={toogleShowAddCoinToPortfolioForm}>Add to Portfolio</button>}
          {showAddCoinToPortfolioForm && (
            <form onSubmit={handleAddToPortfolio}>
              <label htmlFor="quantity">Quantity</label>
              <input disabled={addCoinToPortfolioState.loading} value={quantity} onChange={handleQuantityChange} type="number" name="quantity" id="quantity" />
              <button disabled={addCoinToPortfolioState.loading} type="submit">
                Add
              </button>
              <button disabled={addCoinToPortfolioState.loading} onClick={toogleShowAddCoinToPortfolioForm}>
                Cancel
              </button>
            </form>
          )}
          {showLoginLink && (
            <p>
              <Link>
                <a>Login here</a>
              </Link>
              to add to portfolio
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
