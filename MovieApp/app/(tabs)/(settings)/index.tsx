import styled from "@emotion/native";
import {
  faRightFromBracket,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Separator from "../../../components/separator";
import { useAuth } from "../../../context/AuthContext";
import { useGetUser } from "../../../hooks/useGetUser";
import { STRINGS } from "../../../constants/strings";
import { CustomColors } from "../../../constants/colors";

const SettingsScreen = () => {
  const { user, loading, error } = useGetUser();

  return (
    <ScreenContainer>
      <HeaderWrapper>
        <View>
          <RowView>
            <FontAwesomeIcon
              icon={faUserAlt}
              color={CustomColors.brand.primary}
              size={18}
            />
            <Title>{STRINGS.SETTINGS.TITLE}</Title>
          </RowView>
          <SubText>{STRINGS.SETTINGS.SUBTITLE}</SubText>
        </View>
        <LogoutButton />
      </HeaderWrapper>

      <Separator
        additionalStyles={{
          marginHorizontal: 0,
          backgroundColor: CustomColors.background.tertiary,
        }}
      />

      <ContentContainer>
        {loading ? (
          <ActivityIndicator size="large" color={CustomColors.brand.primary} />
        ) : error ? (
          <ErrorText>{STRINGS.SETTINGS.ERROR}</ErrorText>
        ) : user ? (
          <UserInfoContainer>
            <InfoSection>
              <LabelText>{STRINGS.SETTINGS.LABELS.NAME}</LabelText>
              <InfoText>{user.name}</InfoText>
            </InfoSection>
            <InfoSection>
              <LabelText>{STRINGS.SETTINGS.LABELS.EMAIL}</LabelText>
              <InfoText>{user.email}</InfoText>
            </InfoSection>
          </UserInfoContainer>
        ) : null}
      </ContentContainer>
    </ScreenContainer>
  );
};

const LogoutButton = () => {
  const router = useRouter();
  const { handleLogout } = useAuth();

  return (
    <StyledButton onPress={() => handleLogout(router)}>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        size={13}
        color={CustomColors.brand.primary}
      />
      <ButtonText>{STRINGS.SETTINGS.LOGOUT}</ButtonText>
    </StyledButton>
  );
};

export default SettingsScreen;

const HeaderWrapper = styled(View)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 52,
  marginBottom: theme.spacing.xs,
}));

const ScreenContainer = styled(View)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.md,
  backgroundColor: theme.colors.background.primary,
}));

const Title = styled(Text)(({ theme }) => ({
  fontSize: 24,
  textAlign: "center",
  marginLeft: theme.spacing.xs,
  fontWeight: "600",
  color: theme.colors.text.primary,
}));

const ContentContainer = styled(View)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing.sm,
  marginTop: theme.spacing.md,
}));

const StyledButton = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing.xs,
  padding: theme.spacing.xs,
  borderRadius: theme.spacing.xs,
  backgroundColor: theme.colors.background.secondary,
}));

const ButtonText = styled(Text)(({ theme }) => ({
  color: theme.colors.brand.primary,
  fontWeight: "600",
  fontSize: 14,
}));

const InfoText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontSize: 16,
  marginTop: theme.spacing.xs,
}));

const LabelText = styled(Text)(({ theme }) => ({
  fontSize: 14,
  fontWeight: "600",
  color: theme.colors.text.secondary,
}));

const RowView = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
}));

const SubText = styled.Text(({ theme }) => ({
  color: theme.colors.text.secondary,
  fontSize: 14,
}));

const UserInfoContainer = styled(View)(({ theme }) => ({
  padding: theme.spacing.md,
  width: "100%",
  backgroundColor: theme.colors.background.secondary,
  borderRadius: theme.spacing.sm,
}));

const InfoSection = styled(View)(({ theme }) => ({
  marginBottom: theme.spacing.md,
}));

const ErrorText = styled(Text)(({ theme }) => ({
  color: theme.colors.status.error,
  fontSize: 16,
  textAlign: "center",
}));
