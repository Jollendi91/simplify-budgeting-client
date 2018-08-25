import React from 'react';
import {Link} from 'react-router-dom';
import {PieChart, Legend} from 'react-easy-chart';
import {ResponsivePieChart} from './ResponsivePieChart';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';

import ToolTip from './ToolTip';
import CategoryModule from './CategoryModule';
import {fetchProtectedUser} from '../actions/protected-data';

import styled from 'styled-components';
import {FormContainer} from './styled-components/Forms';
import './Dashboard.css';

// Styled Components

const DashboardContainer = FormContainer.extend`
    top: 66px;
`;

const PortfolioData = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
`;

const StyledPieChart = styled(ResponsivePieChart)`
    padding-right: 18px;
`;

const DashboardCard = styled.section`
    background-color: white;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const Header = styled.h2`
    color: white;
    background-color: #276A73;
    margin: 0;
    border-radius: 5px 5px 0 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
`;

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
              {this.state.key} budget: ${this.state.value.toFixed(2)}/month
            </ToolTip>
          );
        }
        return false;
      }

    render() {

    	const categories = this.props.categories.map((category, index) => 
            <StyledLink key={index} to={`category/${category.id}`}>
                <CategoryModule key={category.id} {...category} />
            </StyledLink>
        );

        const data = this.props.categories.map(category => ({
            key: category.category,
            value: category.amount
        }));

        if (this.props.billsTotal) {
            data.push({
                key: 'Bills',
                value: this.props.billsTotal
            });
        }

        if (this.props.remainingMoney) {
            data.push({
                key: 'Remaining',
                value: this.props.remainingMoney
            });
        }

        const customStyle = {
            '.legend': {
                margin: 'auto',
                textAlign: 'left'        
            },
            '.legend li': {
                marginRight: '16px',
                paddingLeft: '18px',
                fontSize: '.9em'
            }
          };

        return (
            <div>
                <DashboardContainer>
                    <DashboardCard>
                        <Header>Summary</Header>
                        <PortfolioData>
                            <StyledPieChart
                                data={data} 
                                mouseOverHandler={this.mouseOverHandler.bind(this)}
                                mouseOutHandler={this.mouseOutHandler.bind(this)}
                                mouseMoveHandler={this.mouseMoveHandler.bind(this)}
                            />
                            <Legend horizontal data={data} dataId={'key'} styles={customStyle}/>
                            {this.createTooltip()}
                        </PortfolioData>
                    </DashboardCard>
                    <DashboardCard>
                        <Header>Budgets</Header>
                        {categories}
                    </DashboardCard>
                </DashboardContainer>
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