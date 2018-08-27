import React from 'react';
import {connect} from 'react-redux';

import styled from 'styled-components';
import {LoadingSpinner} from './styled-components/Elements';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    height: calc(100vh - 66px);
    margin-top: 66px;
    background-color: white;
`;

const Spinner = LoadingSpinner.extend`
    font-size: 4em;
    color: #4ABDAC;
`;

export function MainLoadingSpinner(props) {
    return (
        <SpinnerContainer>
            <Spinner icon='spinner' />
        </SpinnerContainer>
    )
}

const mapStateToProps = state => ({
    loading: state.simplify.loading
});

export default connect(mapStateToProps)(MainLoadingSpinner);