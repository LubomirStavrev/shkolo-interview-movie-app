import { useState, useEffect } from 'react';
import { useCustomFetch } from './auth/useCustomFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  cover: string;
  resume: string;
  added_on: string;
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { customFetch, error } = useCustomFetch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const data = await customFetch<Movie[]>('/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (data) {
          setMovies(data);
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
}; 