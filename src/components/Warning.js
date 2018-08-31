import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button} from './styled-components/Forms';
import {HeaderContainer} from './styled-components/Elements';
import {deleteCategory} from '../actions/protected-data';

const WarningContainer = styled.td`
    max-width: 300px;
    background: white;
    border-radius: 5px;
    text-align: center;
    display: inline-table;

    p {
        padding: 15px;
    }

    button {
        margin: 10px;
    }
`;
WarningContainer.displayName = "WarningContainer";

export function Warning(props) {
    return (
        <WarningContainer>
            <HeaderContainer>
                <h3>Are you sure?</h3>
            </HeaderContainer>
            <p>Deleting this category ({props.categoryName}) will also remove all of its associated transactions. Delete anyway?</p>
            <Button className="confirm-delete" primary color="#4ABDAC" onClick={() => props.dispatch(deleteCategory(props.id))}>Yes</Button>
            <Button color="#FC4A1A" onClick={() => props.cancelDelete()}>No</Button>
        </WarningContainer> 
    )
}


export default connect()(Warning);