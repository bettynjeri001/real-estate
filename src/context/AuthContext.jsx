import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../config/Firebase';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unified user data fetcher
  const fetchUserData = async (user) => {
    if (!user) return null;
    
    try {
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        ...(userDoc.exists() ? userDoc.data() : {})
      };
    } catch (err) {
      console.error("Error fetching user data:", err);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        const userData = await fetchUserData(user);
        setCurrentUser(userData);
        setError(null);
      } catch (err) {
        setError(err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(userCredential.user);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name, role = 'user') => {
    setLoading(true);
    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update profile
      await updateProfile(userCredential.user, { displayName: name });
      
      // 3. Create Firestore document
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role,
        emailVerified: false,
        createdAt: new Date().toISOString()
      });

      // 4. Send verification email
      await sendEmailVerification(userCredential.user);

      // 5. Update state
      const userData = await fetchUserData(userCredential.user);
      setCurrentUser(userData);
      
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const refreshUser = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const userData = await fetchUserData(auth.currentUser);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}