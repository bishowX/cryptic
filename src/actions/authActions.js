import { LOAD_USER_ERROR, LOAD_USER_SUCCESS } from "actionTypes";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "lib/firebase";

export const signUp = async (dispatch, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await setDoc(doc(firestore, `users/${user.uid}/portfolio/portfolio`), { totalAmount: 0, coins: [] });
    await setDoc(doc(firestore, `users/${user.uid}/watchlist/watchlist`), { coins: [] });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error.message });
  }
};

export const login = async (dispatch, email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    dispatch({ type: LOAD_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOAD_USER_ERROR, payload: error.message });
  }
};

export const logout = async () => {
  await signOut(firebaseAuth);
};
