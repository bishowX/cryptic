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

export const getPortfolio = async (dispatch, uid) => {
  // get portfoilo from firebase db
  dispatch({ type: LOAD_PORTFOLIO_LOADING });
  try {
    const coins = [];
    const coinsDocs = await getDocs(collection(firestore, `${uid}/portfolio/coins`));
    coinsDocs.forEach((coinDoc) => {
      coins.push(coinDoc.data());
    });

    const portfolioDoc = await getDoc(doc(firestore, `${uid}/portfolio`));
    const totalAmount = portfolioDoc.data().totalAmount;
    dispatch({ type: LOAD_PORTFOLIO_SUCCESS, payload: { coins, totalAmount } });
  } catch (error) {
    dispatch({ type: LOAD_PORTFOLIO_ERROR, payload: error.message });
  }
};

const getCoinPrice = async (coinId) => {
  const response = await fetch(`${API_BASE_URL}/v1/assets/${coinId}`, API_OPTIONS);
  const result = await response.json();
  return result[0].price_usd;
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

    dispatch({ type: ADD_COIN_TO_PORTFOLIO_SUCCESS, payload: { symbol: coinId, quantity } });
  } catch (error) {
    dispatch({ type: ADD_COIN_TO_PORTFOLIO_ERROR, payload: error.message });
  }
};
