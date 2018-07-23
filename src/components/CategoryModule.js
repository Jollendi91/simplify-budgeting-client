import React from 'react';

export default function CategoryModule(props) {
    return (
        <section className={props.name}>
            <header><h1>{props.name}</h1></header>
            <h2>Remaining ${props.amount}</h2>
        </section>
    )
}