import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase";

export const AuthContext = createContext({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
      } else {
        setUser(user);
        setError(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return <AuthContext.Provider value={{ user, loading, error, login, signUp, logout }}>{children}</AuthContext.Provider>;
};
