import styled from "@emotion/native";
import { faArrowRight, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { STRINGS } from "../constants/strings";
import { CustomColors } from "../constants/colors";

const WelcomeScreen = () => {
  const handlePress = () => {
    router.push("/(tabs)/(movies)");
  };

  return (
    <Container>
      <ContentWrapper>
        <FontAwesomeIcon
          icon={faFilm}
          size={75}
          color={CustomColors.text.primary}
        />
        <TextWrapper>
          <Title>{STRINGS.WELCOME.TITLE}</Title>
          <Tagline>{STRINGS.WELCOME.TAGLINE}</Tagline>
        </TextWrapper>
        <StyledButton onPress={handlePress}>
          <ButtonText>{STRINGS.WELCOME.GET_STARTED}</ButtonText>
          <FontAwesomeIcon
            icon={faArrowRight}
            color={CustomColors.common.white}
            size={20}
          />
        </StyledButton>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(View)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.primary,
}));

const ContentWrapper = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing.md,
  gap: theme.spacing.lg,
}));

const TextWrapper = styled(View)(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing.md,
}));

const Title = styled(Text)(({ theme }) => ({
  fontSize: 30,
  fontWeight: "bold",
  color: theme.colors.text.primary,
  textAlign: "center",
}));

const Tagline = styled(Text)(({ theme }) => ({
  fontSize: 15,
  textAlign: "center",
  color: theme.colors.text.primary,
}));

const StyledButton = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: theme.colors.brand.primary,
  padding: theme.spacing.md,
  borderRadius: theme.spacing.sm,
  gap: theme.spacing.xs,
}));

const ButtonText = styled(Text)(({ theme }) => ({
  color: theme.colors.common.white,
  fontSize: 16,
  fontWeight: "600",
}));

export default WelcomeScreen;
