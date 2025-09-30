import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userAuth, setUserAuth] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUserId(user.id);
          setUserAuth(true);
        }
  
        setAuthLoaded(true);
    }
  
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userAuth, authLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);