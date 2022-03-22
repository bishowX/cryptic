import { createContext, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase";
import { logout, signUp, login } from "actions/authActions";
import initialAuthState from "initialState/initialAuthState";
import authReducer from "reducers/authReducer";
import { LOAD_USER_LOADING, LOAD_USER_SUCCESS, USER_NOT_LOGGED_IN } from "actionTypes";

export const AuthContext = createContext({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    dispatch({ type: LOAD_USER_LOADING });
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        dispatch({ type: USER_NOT_LOGGED_IN });
      } else {
        dispatch({ type: LOAD_USER_SUCCESS, payload: user });
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    state,
    dispatch,
    signUp,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
