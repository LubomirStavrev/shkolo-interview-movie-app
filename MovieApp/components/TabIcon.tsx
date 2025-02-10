import styled from '@emotion/native';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text, View } from 'react-native';

type TabIconProps = {
  icon: IconDefinition;
  color: string;
  name: string;
  focused: boolean;
  size?: number;
};

const TabIcon = ({ icon, color, name, focused, size = 22 }: TabIconProps) => {
  return (
    <Container>
      <FontAwesomeIcon icon={icon} color={color} size={size} />
    </Container>
  );
};

export default TabIcon;

const Container = styled(View)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 16,
}));

const TabText = styled(Text)<{ focused: boolean }>(({ focused, theme }) => ({
  fontSize: 10,
  marginTop: 4,
  color: focused ? '#374151' : "#828282",
}));
