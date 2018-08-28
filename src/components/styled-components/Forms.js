import styled, {css} from 'styled-components';  
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Input from '../input';

export const FormContainer = styled.article`
    width: 100%;
    max-width: 500px;
    margin: auto;
    border-radius: 5px;
    position: relative;
`;

export const StyledLabel = styled.label`
    font-size: 1.3em;
    padding: 10px;
`;

export const HorizontalInputs = styled.div`
    padding: 20px 10px;

    .form-input-container {
        margin: 10px 0;
    }
`;

export const StyledInput = styled(Input)`
    max-width: 350px;
    padding: 5px;
    margin: 0 auto;
    position: relative;

    label {
        position: absolute;
        top: -10px;
        font-size: 1.1em;
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
    top: 10px;
    left: 10px;
    font-size: 1.5em;
    color: white;
    cursor: pointer;
    z-index: 1;
`;

export const ButtonContainer = styled.div`
    padding-bottom: 20px;
`;

// Implement Disabled Button Style
const complexBackground = css`
    ${props => props.primary && props.color ? props.color : 'white'}
`;

const complexBorder = css`
    ${props => props.color ? props.color : 'white'}
`;

const complexFontColor = css`
    ${props => props.primary && props.color ? 'white' : props.color}
`;

export const Button = styled.button`
    padding: .2em ${props => props.signup ? '4em' : '2em'};
    font-size: 1em;
    margin: .75em 5px 0;
    background-color: ${props => props.disabled ? '#bbb' : complexBackground};
    border: 2px solid ${props => props.disabled ? "#bbb" : complexBorder};
    color: ${props => props.disabled ?  'white' : complexFontColor};
    font-weight: bold;
    border-radius: 5px;
}
    cursor: pointer;
`;

// Setup Forms
export const SetupInput = StyledInput.extend`
    max-width: 150px;
    padding: 0;
    position: relative;

    label {
        position: absolute;
        top: initial;
        bottom: -20px;
    }

    input {
        width: ${props => props.amount ? '95px' : "100%"};
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f4f4f4;
        &:focus {
            border-color: #F7B733;
        }
    }
`;

export const UpdateInput = StyledInput.extend`
    padding: 0;
    position: relative;

    label {
        position: absolute;
        top: initial;
        bottom: -20px;
    }

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
    max-width: 400px;
    margin: 15px auto;
    padding-bottom: 10px;

    label {
        font-size: 1.1em;
    }
`;