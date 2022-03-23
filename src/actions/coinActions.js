import {
  LOAD_COINS_ERROR,
  LOAD_COINS_LOADING,
  LOAD_COINS_SUCCESS,
  LOAD_COIN_DETAIL_ERROR,
  LOAD_COIN_DETAIL_LOADING,
  LOAD_COIN_DETAIL_SUCCESS,
} from "actionTypes";
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

export const getCoinDetail = async (dispatch, coinId) => {
  dispatch({ type: LOAD_COIN_DETAIL_LOADING });
  fetch(`${API_BASE_URL}/v1/assets/${coinId}`, API_OPTIONS)
    .then((response) => {
      response.json().then((coins) => {
        dispatch({ type: LOAD_COIN_DETAIL_SUCCESS, payload: coins[0] });
      });
    })
    .catch((error) => {
      dispatch({ type: LOAD_COIN_DETAIL_ERROR, payload: error.message });
    });
};
