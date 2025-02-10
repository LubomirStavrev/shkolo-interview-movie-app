import styled from '@emotion/native';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorProps {
  additionalStyles?: ViewStyle;
}

const Separator: React.FC<SeparatorProps> = ({ additionalStyles }) => <StyledSeparator style={additionalStyles} />;

export default Separator;

const StyledSeparator = styled(View)(({ theme }) => ({
  height: 1,
  marginVertical: 16,
  marginHorizontal: -16,
  backgroundColor: "#BDBDBD",
}));
