import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { useGetMovieById } from '../../../../hooks/useGetMovieById';
import { ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CustomColors } from '../../../../constants/colors';

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { movie, loading, error } = useGetMovieById(id as string);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={CustomColors.brand.primary} />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container>
        <ErrorText>Error loading movie details</ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <BackButtonContainer onPress={() => router.back()}>
        <FontAwesomeIcon icon={faAngleLeft} size={24} color={CustomColors.text.primary} />
      </BackButtonContainer>

      <ScrollView>
        <CoverImage source={{ uri: movie.cover }} />
        <ContentContainer>
          <Title>{movie.title}</Title>
          <MetadataContainer>
            <MetadataText>{movie.year}</MetadataText>
            <Dot>•</Dot>
            <QualityBadge>
              <QualityText>4K</QualityText>
            </QualityBadge>
            <Dot>•</Dot>
            <Duration>152 minutes</Duration>
            <Dot>•</Dot>
            <Rating>7.0 (IMDb)</Rating>
          </MetadataContainer>
          
          <Section>
            <SectionTitle>Genre</SectionTitle>
            <GenreContainer>
              <GenrePill>
                <GenreText>{movie.genre}</GenreText>
              </GenrePill>
              <GenrePill>
                <GenreText>Sci-Fi</GenreText>
              </GenrePill>
            </GenreContainer>
          </Section>

          <Section>
            <SectionTitle>Synopsis</SectionTitle>
            <Synopsis>{movie.resume}</Synopsis>
          </Section>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.primary,
}));

const CoverImage = styled(Image)({
  width: "100%",
  height: 500,
});

const ContentContainer = styled(View)(({ theme }) => ({
  padding: theme.spacing.md,
  marginTop: -40,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  backgroundColor: theme.colors.background.secondary,
}));

const Title = styled(Text)(({ theme }) => ({
  fontSize: 32,
  fontWeight: "bold",
  color: theme.colors.text.primary,
  marginBottom: theme.spacing.md,
}));

const MetadataContainer = styled(View)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.lg,
}));

const MetadataText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.tertiary,
  fontSize: 14,
}));

const Dot = styled(Text)(({ theme }) => ({
  color: theme.colors.text.tertiary,
  marginHorizontal: theme.spacing.xs,
}));

const QualityBadge = styled(View)(({ theme }) => ({
  backgroundColor: theme.colors.background.tertiary,
  paddingHorizontal: theme.spacing.xs,
  paddingVertical: 4,
  borderRadius: 4,
}));

const QualityText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontSize: 12,
}));

const Duration = styled(Text)(({ theme }) => ({
  color: theme.colors.text.tertiary,
  fontSize: 14,
}));

const Rating = styled(Text)(({ theme }) => ({
  color: theme.colors.text.tertiary,
  fontSize: 14,
}));

const Section = styled(View)(({ theme }) => ({
  marginBottom: theme.spacing.lg,
}));

const SectionTitle = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: theme.spacing.sm,
}));

const GenreContainer = styled(View)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.xs,
}));

const GenrePill = styled(View)(({ theme }) => ({
  backgroundColor: theme.colors.background.tertiary,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.xs,
  borderRadius: 20,
}));

const GenreText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontSize: 14,
}));

const Synopsis = styled(Text)(({ theme }) => ({
  color: theme.colors.text.tertiary,
  fontSize: 14,
  lineHeight: 24,
}));

const ErrorText = styled(Text)(({ theme }) => ({
  color: theme.colors.status.error,
  fontSize: 16,
}));

const BackButtonContainer = styled(TouchableOpacity)(({ theme }) => ({
  position: "absolute",
  top: 70,
  left: theme.spacing.md,
  zIndex: 1,
}));

export default MovieDetailsScreen;
