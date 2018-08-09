import React from 'react';
import {connect} from 'react-redux';

export function CategoryModule(props) {
 

    return (
        <section className="module">
            <header><h1>{props.category}</h1></header>
            <h2>Remaining ${props.amount - props.transactionAmount}</h2>
        </section>
    )
}

const mapStateToProps = (state, props) => ({
    transactionAmount: state.simplify.user.categories.find(category => category.id === props.id).transactions.reduce((accumulator, currentTransaction) => accumulator + currentTransaction.amount, 0) || 0
});

export default connect(mapStateToProps)(CategoryModule);