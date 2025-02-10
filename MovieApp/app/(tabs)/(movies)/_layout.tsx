import styled from "@emotion/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "expo-router";
import { Platform, Text, View } from "react-native";
import { STRINGS } from "../../../constants/strings";
import { CustomColors } from "../../../constants/colors";

const CasesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: STRINGS.MOVIES.HEADER,
          title: STRINGS.MOVIES.HEADER,
          header: () => (
            <SafeWrapper>
              <HeaderContainer>
                <TitleContainer>
                  <Title>{STRINGS.MOVIES.HEADER}</Title>
                </TitleContainer>
              </HeaderContainer>
            </SafeWrapper>
          ),
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          headerTitle: STRINGS.MOVIES.HEADER,
          title: STRINGS.MOVIES.HEADER,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const SafeWrapper = styled(View)(({ theme }) => ({
  backgroundColor: theme.colors.background.primary,
  paddingTop: Platform.OS === "ios" ? 65 : 0,
}));

const HeaderContainer = styled(View)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing.md,
  paddingTop: theme.spacing.xs,
  paddingBottom: theme.spacing.xl,
  width: "95%",
  alignSelf: "center",
}));

const TitleContainer = styled(View)({
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
});

const Title = styled(Text)(({ theme }) => ({
  fontSize: 26,
  color: theme.colors.text.primary,
  fontFamily: "Mullish-Italic",
  flex: 1,
  flexWrap: "wrap",
  textAlign: "left",
}));

export default CasesLayout;
