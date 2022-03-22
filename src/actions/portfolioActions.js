import { firestore } from "lib/firebase";
import { LOAD_PORTFOLIO_LOADING, LOAD_PORTFOLIO_SUCCESS, LOAD_PORTFOLIO_ERROR } from "actionTypes";
import { doc, getDoc } from "firebase/firestore";

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
