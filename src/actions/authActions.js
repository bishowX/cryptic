export const signUp = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    setError(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    setError(error.message);
  }
};

export const logout = async () => {
  await signOut(firebaseAuth);
};
