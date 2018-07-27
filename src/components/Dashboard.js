import React from 'react';
import {Link} from 'react-router-dom';
import {PieChart} from 'react-easy-chart';
import {connect} from 'react-redux';

import CategoryModule from './CategoryModule';


import './Dashboard.css';


export function Dashboard(props) {

    const categories = props.categories.map((category, index) => 
        <Link key={index} to={`category/${category.id}`}>
         <CategoryModule key={index} {...category} />
        </Link>
    )

    const data = props.categories.map(category => ({
        key: category.category,
        value: category.amount
    }));

    data.push({
        key: 'Remaining',
        value: props.remainingMoney
    });

    console.log(props.remainingMoney);

    return (
        <div>
            <div className='dashboard-container'>
                <header className="main-header">
                    <section className="portfolio-data">
                        <PieChart 
                            innerHoleSize={200}
                            labels 
                            data={data} 

                        />
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
    categories: state.categories,
    remainingMoney: state.monthlySalary - state.categories.reduce((accumulator, currentCategory) => accumulator + currentCategory.amount, 0) - state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0)
});

export default connect(mapStateToProps)(Dashboard);