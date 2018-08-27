import styled, {keyframes} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ComponentContainer = styled.section`
    position: relative;
    top: 66px;
    min-height: calc(100vh - 66px);
    background-color: white;
`;


export const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #276A73;
    color: white;
    position: relative;
`;


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled(FontAwesomeIcon)`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  font-size: 1.2em;
`;