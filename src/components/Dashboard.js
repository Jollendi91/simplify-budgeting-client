import React from 'react';
import {Link} from 'react-router-dom';

import CategoryModule from './CategoryModule';
import NavBar from './NavBar';

import './Dashboard.css';


export default function Dashboard(props) {

    const categories = props.categories.map((category, index) => 
        <Link to={`category/${category.categoryName}`}>
         <CategoryModule key={index} {...category} />
        </Link>
    )

    return (
        <div>
            <NavBar page={'dashboard'} />

            <div className='dashboard-container'>
                <header class="main-header">
                    <section class="portfolio-data">
                        <p>[graph of data]</p>
                    </section>
                </header>
                <main>
                    {categories}
                </main>
            </div>
        </div>
    )
}

