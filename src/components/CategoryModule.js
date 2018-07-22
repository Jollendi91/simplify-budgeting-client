import React from 'react';

export default function CategoryModule(props) {
    return (
        <section className={props.categoryName}>
            <header><h1>{props.categoryName}</h1></header>
            <h2>Remaining {props.categoryAmount}</h2>
        </section>
    )
}