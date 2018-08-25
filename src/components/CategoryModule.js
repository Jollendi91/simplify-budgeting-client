import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ProgressBar from 'react-progress-bar.js';
import styled from 'styled-components';

// Styled Components

const BudgetContainer = styled.section`
    display: grid;
    grid-template-columns: 95%;
    grid-template-rows: 1fr 1fr;
    padding: 10px 10px 15px;
    border-bottom: 1px solid #ccc;
    position: relative;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const Header = styled.h3`
    margin: 0;
    font-size: 1.25em;
`;

const AmountRemaining = styled.p`
    margin: 0;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 7px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
    color: #FC4A1A;
`;

// Budget Progress Bar
const BudgetBar = ProgressBar.Line;

const options = {
	strokeWidth: 1,
	color: '#F7B733',
	trailColor: '#DEDCE3',
	easing: 'easeOut',
	svgStyle: {
		display: 'block',
		width: '100%',
		height: '100%',
		borderRadius: '5px'
	},
	text: {
		style: {
			color: '#000',
			fontWeight: 'bold',
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: 0,
			margin: 0,
			transform: {
				prefix: true,
				value: 'translate(-50%, -50%)'
			}
		}
	}
};

const containerStyle = {
	height: '30px'
};

export function CategoryModule(props) {
 

    return (
        <BudgetContainer>
            <HeaderContainer>
                <Header>{props.category}</Header>
                <AmountRemaining>${(props.amount - props.transactionAmount).toFixed(2)} Left</AmountRemaining>
            </HeaderContainer>
            <BudgetBar
                progress={props.amount / props.transactionAmount}
                text={`$${props.transactionAmount.toFixed()} of $${props.amount}`}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'}
            />
            <StyledIcon icon="angle-right"/>
        </BudgetContainer>
    )
}

const mapStateToProps = (state, props) => {
    let currentCategory = state.simplify.user.categories.find(category => category.id === props.id);

    return {
        transactionAmount: currentCategory.transactions.reduce((accumulator, currentTransaction) => accumulator + parseFloat(currentTransaction.amount), 0)
    }
};

export default connect(mapStateToProps)(CategoryModule);