import React from 'react';
import {Link} from 'react-router-dom';
import {PieChart} from 'react-easy-chart';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';

import ToolTip from './ToolTip';
import CategoryModule from './CategoryModule';
import {fetchProtectedUser} from '../actions/protected-data';

import './Dashboard.css';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showToolTip: false,
            top: '',
            left: '',
            value: '',
            key: ''
        }
    }

    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

    mouseOverHandler(d, e) {
        this.setState({
          showToolTip: true,
          top: e.y,
          left: e.x,
          value: d.value,
          key: d.data.key
        });
      }
    
      mouseMoveHandler( d, e) {
        if (this.state.showToolTip) {
          this.setState({top: e.y, left: e.x});
        }
      }
    
      mouseOutHandler() {
        this.setState({showToolTip: false});
      }
    
      createTooltip() {
        if (this.state.showToolTip) {
          return (
            <ToolTip
              top={this.state.top}
              left={this.state.left}
            >
              {this.state.key} budget: ${this.state.value}/month
            </ToolTip>
          );
        }
        return false;
      }

    render() {

    	const categories = this.props.categories.map((category, index) => 
            <Link key={index} to={`category/${category.id}`}>
                <CategoryModule key={category.id} {...category} />
            </Link>
        );

        const data = this.props.categories.map(category => ({
            key: category.category,
            value: category.amount
        }));

        if (this.props.remainingMoney) {
            data.push({
                key: 'Remaining',
                value: this.props.remainingMoney
            });
        }

        if (this.props.billsTotal) {
            data.push({
                key: 'Bills',
                value: this.props.billsTotal
            });
        }
        
        return (
            <div>
                <div className='dashboard-container'>
                    <header className="main-header">
                        <section className="portfolio-data">
                            <PieChart 
                                innerHoleSize={200}
                                labels 
                                data={data} 
                                mouseOverHandler={this.mouseOverHandler.bind(this)}
                                mouseOutHandler={this.mouseOutHandler.bind(this)}
                                mouseMoveHandler={this.mouseMoveHandler.bind(this)}
                            />
                            {this.createTooltip()}
                        </section>
                    </header>
                    <main className="category-modules">
                        {categories}
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let categoryTotal = state.simplify.user.categories.reduce((accumulator, currentCategory) => accumulator + parseFloat(currentCategory.amount), 0);
    let billTotal = state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0);
     
    return  {
        categories: state.simplify.user.categories,
        remainingMoney: state.simplify.user.monthlySalary - categoryTotal - billTotal,
        billsTotal: billTotal,
        step: state.simplify.user.setupStep,
        notLoaded: state.simplify.user.id === null
    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));