import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}