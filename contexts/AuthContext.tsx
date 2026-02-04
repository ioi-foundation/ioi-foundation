import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Role } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: Profile | null;
  login: (username: string, accessKey: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  addMember: (username: string, role: Role, password: string) => Promise<{ success: boolean; message?: string }>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  login: async () => ({ success: false }), 
  logout: () => {}, 
  addMember: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  loading: true 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check local storage for persisted session
  useEffect(() => {
    const storedId = localStorage.getItem('ioi_nexus_user_id');
    if (storedId) {
      fetchUser(storedId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (id: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data) {
      setUser(data);
    } else {
      // Invalid ID in storage
      localStorage.removeItem('ioi_nexus_user_id');
    }
    setLoading(false);
  };

  const login = async (username: string, accessKey: string) => {
    setLoading(true);
    
    // RPC Call for secure verification via server-side function
    // This prevents password leakage to the frontend
    const { data, error } = await supabase.rpc('login_user', { 
        username_in: username, 
        key_in: accessKey 
    });

    if (error) {
        console.error("Login RPC Error:", error);
        setLoading(false);
        return { success: false, message: 'System Error: ' + error.message };
    }

    if (data && data.length > 0) {
      const profile = data[0];
      setUser(profile);
      localStorage.setItem('ioi_nexus_user_id', profile.id);
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, message: 'Invalid identity or access code.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ioi_nexus_user_id');
  };

  const addMember = async (username: string, role: Role, password: string) => {
    if (!user || user.role !== 'Maintainer') {
        return { success: false, message: 'Unauthorized. Maintainers only.' };
    }

    const { data, error } = await supabase.rpc('create_user_rpc', {
        username_in: username,
        role_in: role,
        password_in: password
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true };
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    if (!user) return { success: false, message: 'Not logged in.' };

    const { data, error } = await supabase.rpc('update_password_rpc', {
        user_id_in: user.id,
        old_password_in: oldPassword,
        new_password_in: newPassword
    });

    if (error) {
        return { success: false, message: error.message };
    }

    if (data === false) {
        return { success: false, message: 'Incorrect existing password.' };
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addMember, updatePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};