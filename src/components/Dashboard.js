import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import CategoryModule from './CategoryModule';


import './Dashboard.css';


export function Dashboard(props) {

    const categories = props.categories.map((category) => 
        <Link key={category.id} to={`category/${category.id}`}>
         <CategoryModule key={category.id} {...category} />
        </Link>
    )

    return (
        <div>
            <div className='dashboard-container'>
                <header className="main-header">
                    <section className="portfolio-data">
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