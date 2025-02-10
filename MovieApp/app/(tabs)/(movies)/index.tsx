import React, { useState } from 'react';
import { FlatList, ActivityIndicator, TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { useMovies } from '../../../hooks/useMovies';
import { router } from 'expo-router';
import styled from '@emotion/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { STRINGS } from '../../../constants/strings';
import { CustomColors } from '../../../constants/colors';
import { CustomSpacings } from '../../../constants/spacings';


const MoviesListScreen = () => {
  const { movies, loading, error } = useMovies();
  const [activeCategory, setActiveCategory] = useState(STRINGS.MOVIES.CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMoviePress = (id: number) => {
    router.push(`/movie/${id}`);
  };

  if (loading) {
    return (
      <CenterContainer>
        <ActivityIndicator size="large" color={CustomColors.brand.primary} />
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        <ErrorText>{STRINGS.MOVIES.ERROR}</ErrorText>
      </CenterContainer>
    );
  }

  return (
    <Container>
      <SearchBarWrapper>
        <FontAwesomeIcon icon={faSearch} size={20} color={CustomColors.text.secondary} />
        <SearchInput
          placeholder={STRINGS.MOVIES.SEARCH_PLACEHOLDER}
          placeholderTextColor={CustomColors.text.secondary}
          onChangeText={setSearchQuery}
        />
      </SearchBarWrapper>

      <TabsWrapper>
        {STRINGS.MOVIES.CATEGORIES.map((category) => (
          <TabButton key={category} onPress={() => setActiveCategory(category)}>
            <TabText active={activeCategory === category}>{category}</TabText>
            {activeCategory === category && <Underline />}
          </TabButton>
        ))}
      </TabsWrapper>

      <FlatList
        data={movies}
        numColumns={2}
        renderItem={({ item }) => (
          <MovieCard onPress={() => handleMoviePress(item.id)}>
            <MovieImage source={{ uri: item.cover }} />
            <MovieInfo>
              <MovieTitle>{item.title}</MovieTitle>
              <MovieDetails>
                <MovieMetaText>{item.year}</MovieMetaText>
                <DotSeparator>•</DotSeparator>
                <MovieMetaText>{item.genre}</MovieMetaText>
              </MovieDetails>
            </MovieInfo>
          </MovieCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: CustomSpacings.md }}
      />
    </Container>
  );
};

const Container = styled(View)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.primary,
  paddingHorizontal: theme.spacing.sm
}));

const CenterContainer = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background.primary,
}));

const ErrorText = styled(Text)(({ theme }) => ({
  color: theme.colors.status.error,
  fontSize: 16,
}));

const MovieCard = styled(TouchableOpacity)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing.xs,
  borderRadius: theme.spacing.sm,
}));

const MovieImage = styled(Image)(() => ({
  width: 160,
  height: 200,
  borderRadius: 10,
}));

const MovieInfo = styled(View)(({ theme }) => ({
  padding: theme.spacing.sm,
}));

const MovieTitle = styled(Text)(({ theme }) => ({
  fontSize: 16,
  fontWeight: '700',
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.xs,
}));

const MovieDetails = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}));

const MovieMetaText = styled(Text)(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
}));

const DotSeparator = styled(Text)(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
  marginHorizontal: theme.spacing.xs,
}));

const SearchBarWrapper = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.background.secondary,
  borderRadius: 24,
  padding: theme.spacing.sm,
  paddingHorizontal: theme.spacing.md,
  marginBottom: theme.spacing.md,
}));

const SearchInput = styled(TextInput)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing.sm,
  color: theme.colors.text.primary,
  fontSize: 16,
}));

const TabsWrapper = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: theme.spacing.sm,
}));

const TabButton = styled(TouchableOpacity)(() => ({
  alignItems: 'center',
}));

const TabText = styled(Text)<{ active: boolean }>(({ theme, active }) => ({
  color: active ? theme.colors.brand.secondary : theme.colors.text.primary,
  fontSize: 16,
  fontWeight: '500',
}));

const Underline = styled(View)(({ theme }) => ({
  width: '100%',
  height: 2,
  backgroundColor: theme.colors.brand.secondary,
  marginTop: theme.spacing.xs,
  borderRadius: 2,
}));

export default MoviesListScreen;
