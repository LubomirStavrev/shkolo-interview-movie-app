import { useState, useEffect } from 'react';
import { useCustomFetch } from './auth/useCustomFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
}

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { customFetch, error } = useCustomFetch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await customFetch('/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (userData) {
          setUser(userData as User);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};