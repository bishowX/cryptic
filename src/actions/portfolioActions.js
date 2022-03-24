import { firestore } from "lib/firebase";
import {
  LOAD_PORTFOLIO_LOADING,
  LOAD_PORTFOLIO_SUCCESS,
  LOAD_PORTFOLIO_ERROR,
  ADD_COIN_TO_PORTFOLIO_SUCCESS,
  ADD_COIN_TO_PORTFOLIO_ERROR,
  ADD_COIN_TO_PORTFOLIO_LOADING,
} from "actionTypes";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { API_BASE_URL, API_OPTIONS } from "constants";

const getTotalPrice = (coins, priceKey) => {
  let sum = 0;
  coins.forEach((coin) => {
    sum += coin[priceKey];
  });
  return sum;
};

const getLatestPricesOfCoins = (coins) => {
  const newCoins = [...coins];
  newCoins.forEach(async (coin, idx) => {
    const latestPrice = await getCoinPrice(coin.symbol);
    newCoins[idx].latestPrice = latestPrice || 0;
  });

  return newCoins;
};

export const getPortfolio = async (dispatch, uid) => {
  // get portfoilo from firebase db
  dispatch({ type: LOAD_PORTFOLIO_LOADING });
  try {
    const coins = [];
    const coinsDocs = await getDocs(collection(firestore, `${uid}/portfolio/coins`));
    coinsDocs.forEach((coinDoc) => {
      coins.push(coinDoc.data());
    });

    // const portfolioDoc = await getDoc(doc(firestore, `${uid}/portfolio`));
    // const totalAmount = portfolioDoc.data().totalAmount;
    const coinsWithLatestPrice = [];
    let totalLatestAmount = 0;

    // get latest price of all coins in portfolio
    //push coin adding latestPrice field to coinsWithLatestPrice array
    // update totalLatestAmount
    coins.forEach(async (coin, idx) => {
      const latestPrice = await getCoinPrice(coin.symbol);
      coinsWithLatestPrice.push({ ...coin, latestPrice: latestPrice || 0 });
      // update coins array with the latest price
      coins[idx] = coinsWithLatestPrice[idx];
      totalLatestAmount += latestPrice || 0;
    });

    // const coinsWithLatestPrice = getLatestPricesOfCoins(coins);
    const totalBoughtAmount = getTotalPrice(coins, "boughtPrice");
    // const totalLatestAmount = getTotalPrice(coins, "latestPrice");
    dispatch({ type: LOAD_PORTFOLIO_SUCCESS, payload: { coins: coins, totalBoughtAmount, totalLatestAmount } });
  } catch (error) {
    dispatch({ type: LOAD_PORTFOLIO_ERROR, payload: error.message });
  }
};

const getCoinPrice = async (coinId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/assets/${coinId}`, API_OPTIONS);
    const result = await response.json();
    return result[0].price_usd;
  } catch (error) {
    console.log(error);
  }
};

export const addCoinToPortfolio = async (dispatch, uid, coinId, quantity) => {
  dispatch({ type: ADD_COIN_TO_PORTFOLIO_LOADING });
  try {
    // check if same coin is in the db coins array
    //if exists do nothing else add coin to portfolio
    const q = query(collection(firestore, `${uid}/portfolio/coins`), where("symbol", "==", coinId));
    const querySnapshot = await getDocs(q);
    let coinDoc = null;
    querySnapshot.forEach((result) => {
      coinDoc = result;
    });

    //get latest coin price
    const coinPrice = await getCoinPrice(coinId);
    if (coinDoc) {
      await updateDoc(doc(firestore, `${uid}/portfolio/coins/${coinDoc.id}`), { symbol: coinId, quantity, boughtPrice: coinPrice });
    } else {
      await addDoc(collection(firestore, `${uid}/portfolio/coins`), { symbol: coinId, quantity, boughtPrice: coinPrice });
    }

    dispatch({ type: ADD_COIN_TO_PORTFOLIO_SUCCESS, payload: { symbol: coinId, quantity, boughtPrice: coinPrice } });
  } catch (error) {
    dispatch({ type: ADD_COIN_TO_PORTFOLIO_ERROR, payload: error.message });
  }
};
