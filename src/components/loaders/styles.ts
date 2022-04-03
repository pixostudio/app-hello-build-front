import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';

export const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite
`;
