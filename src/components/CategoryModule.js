import React from 'react';
import {connect} from 'react-redux';

export function CategoryModule(props) {
 

    return (
        <section className="module">
            <header><h1>{props.category}</h1></header>
            <h2>Remaining ${(props.amount - props.transactionAmount).toFixed(2)}</h2>
        </section>
    )
}

const mapStateToProps = (state, props) => {
    let currentCategory = state.simplify.user.categories.find(category => category.id === props.id);
    let transactionAmount;
    if (currentCategory.transactions) {
        transactionAmount = currentCategory.transactions.reduce((accumulator, currentTransaction) => accumulator + parseFloat(currentTransaction.amount), 0);
    } else {
        transactionAmount = 0;
    }

    return {
        transactionAmount: transactionAmount
    }
};

export default connect(mapStateToProps)(CategoryModule);