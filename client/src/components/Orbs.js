import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();

    const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${width / 4}px, ${height / 4}px); // Adjust the translation values
    }
    100% {
      transform: translate(0, 0);
    }
  `;

    const OrbStyled = styled.div`
  width: 50vh;
  height: 50vh;
  position: absolute;
  border-radius: 50%;
  margin-left: -25vh; /* Adjust the margin */
  margin-top: -25vh;  /* Adjust the margin */
  background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
  filter: blur(600px);
  animation: ${moveOrb} 15s alternate linear infinite;
`;

    return <OrbStyled></OrbStyled>;
}

export default Orb;
