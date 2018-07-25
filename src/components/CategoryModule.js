import React from 'react';

export default function CategoryModule(props) {
    return (
        <section className={props.category}>
            <header><h1>{props.category}</h1></header>
            <h2>Remaining ${props.amount}</h2>
        </section>
    )
}