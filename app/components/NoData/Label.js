import React from 'react';
import styled from 'styled-components';

import { colorConfig } from 'config/style';

export const NoInfo = styled.span`
  color: ${colorConfig.disabled};
`;

// eslint-disable-next-line
const NoDataLabel = ({ children, ...rest }) => (
  <NoInfo {...rest}>{children || 'No info'}</NoInfo>
);

export default NoDataLabel;
