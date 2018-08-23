import styled from 'styled-components';  
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Input from '../input';

export const FormContainer = styled.article`
    width: 100%;
    max-width: 500px;
    padding: 20px 10px;
    margin: auto;
    position: relative;
`;

export const CloseButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 1.5em;
    cursor: pointer;
`;

export const Button = styled.button`
    padding: .6em 5em;
    font-size: .8em;
    margin-top: 1em;
    cursor: pointer;
`;

export const StyledInput = styled(Input)`
max-width: 350px;
padding: 5px;
margin: 0 auto 10px;

label {
    text-align: left;
    font-size: 1em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    max-width: 100%;
    width: 100%;
    padding: 5px;
    border: 0;
    border-bottom: 1px solid #aaa;
    font-size: 18px;
    margin-top: 5px;
}
`;

export const FormError = styled.div`
    font-size: .8em;
    color: red;
    font-weight: bold;
`;