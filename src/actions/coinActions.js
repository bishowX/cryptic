import { LOAD_COINS_ERROR, LOAD_COINS_LOADING, LOAD_COINS_SUCCESS } from "actionTypes";
import { API_BASE_URL, API_OPTIONS } from "constants";

export const getCoins = async (dispatch) => {
  dispatch({ type: LOAD_COINS_LOADING });
  fetch(`${API_BASE_URL}/v1/assets`, API_OPTIONS)
    .then((response) => {
      response.json().then((coins) => {
        dispatch({ type: LOAD_COINS_SUCCESS, payload: coins });
      });
    })
    .catch((error) => {
      dispatch({ type: LOAD_COINS_ERROR, payload: error.message });
    });
};
