import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import CategoryModule from './CategoryModule';
import NavBar from './NavBar';

import './Dashboard.css';


export function Dashboard(props) {

    const categories = props.categories.map((category) => 
        <Link to={`category/${category.name}`}>
         <CategoryModule key={category.id} {...category} />
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

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps)(Dashboard);