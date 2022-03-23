import { firestore } from "lib/firebase";
import {
  LOAD_PORTFOLIO_LOADING,
  LOAD_PORTFOLIO_SUCCESS,
  LOAD_PORTFOLIO_ERROR,
  ADD_COIN_TO_PORTFOLIO_SUCCESS,
  ADD_COIN_TO_PORTFOLIO_ERROR,
  ADD_COIN_TO_PORTFOLIO_LOADING,
} from "actionTypes";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export const getPortfolio = async (dispatch, uid) => {
  // get portfoilo from firebase db
  dispatch({ type: LOAD_PORTFOLIO_LOADING });
  try {
    const resultDoc = await getDoc(doc(firestore, `users/${uid}/portfolio/portfolio`));

    dispatch({ type: LOAD_PORTFOLIO_SUCCESS, payload: resultDoc.data() });
  } catch (error) {
    dispatch({ type: LOAD_PORTFOLIO_ERROR, payload: error.message });
  }
};

export const addCoinToPortfolio = async (dispatch, uid, coinId, quantity) => {
  dispatch({ type: ADD_COIN_TO_PORTFOLIO_LOADING });
  try {
    await updateDoc(doc(firestore, `users/${uid}/portfolio/portfolio`), { coins: arrayUnion({ symbol: coinId, quantity }) });

    dispatch({ type: ADD_COIN_TO_PORTFOLIO_SUCCESS, payload: { symbol: coinId, quantity } });
  } catch (error) {
    dispatch({ type: ADD_COIN_TO_PORTFOLIO_ERROR, payload: error });
  }
};
