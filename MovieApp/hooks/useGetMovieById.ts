import { useState, useEffect } from 'react';
import { useCustomFetch } from './auth/useCustomFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from './useMovies';

export const useGetMovieById = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { customFetch, error } = useCustomFetch();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const data = await customFetch<Movie>(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (data) {
          setMovie(data);
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
}; 