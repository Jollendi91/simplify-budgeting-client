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

export const StyledInput = styled(Input)`
    max-width: 350px;
    padding: 5px;
    margin: 0 auto;

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
        padding:  ${props => props.signup ? '5px' : '3px'};
        border: 0;
        border-bottom: 1px solid #aaa;
        font-size: 18px;
        margin-top: 5px;
    }
`;

export const CloseButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 1.5em;
    cursor: pointer;
`;

export const Button = styled.button`
    padding: .4em ${props => props.signup ? '4em' : '2em'};
    font-size: .8em;
    margin: .75em 5px 0;

    cursor: pointer;
`;

// Setup Forms
export const SetupInput = StyledInput.extend`
    max-width: 150px;
    padding: 0;
    position: relative;

    label {
        position: absolute;
        bottom: -20px;
    }

    input {
        width: ${props => props.amount ? '95px' : "100%"};
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f4f4f4;
    }
`;

export const UpdateInput = StyledInput.extend`
    padding: 0;

    input {
        font-size: 1em;
        padding: 2px;
        margin-top: 0;
        border: 1px solid #aaa;
    }
`;

export const Inputs = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    margin: 15px 0;
    padding-bottom: 10px;
`;