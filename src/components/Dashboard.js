import React from 'react';
import {Link} from 'react-router-dom';
import {Legend} from 'react-easy-chart';
import {ResponsivePieChart} from './ResponsivePieChart';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';

import CategoryModule from './CategoryModule';
import {fetchProtectedUser} from '../actions/protected-data';

import styled from 'styled-components';
import {FormContainer} from './styled-components/Forms';
import { MainLoadingSpinner } from './MainLoadingSpinner';

// Styled Components

const DashboardContainer = FormContainer.extend`
    top: 70px;

    @media screen and (min-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 1000px;
        padding: 0 10px;
    }
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

const GraphText = styled.p`
    padding: 10px;
    margin: 0;
`;

const DashboardCard = styled.section`
    background-color: white;
    border-radius: 5px;
    margin: 10px;
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
            key: '',
            dataDisplay: ''
        }
    }

    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

    render() {

    	const categories = this.props.categories.map((category, index) => 
            <StyledLink key={index} to={`category/${category.id}`}>
                <CategoryModule key={category.id} {...category} />
            </StyledLink>
        );

        let currentColor;
        let colorNumber = 0;
        const colorArray = ['#276A73', '#4ABDAC', '#FC4A1A', '#F7B733', '#DEDCE3'];
        

        function getColor(i) {
            currentColor = colorArray[i];
            colorNumber++;
            return currentColor
        };

        const data = this.props.categories.map(category => ({
            key: category.category,
            value: category.amount,
            color: getColor(colorNumber)
        }));

        if (this.props.billsTotal) {
            data.push({
                key: 'Bills',
                value: this.props.billsTotal,
                color: getColor(colorNumber)
            });
        }

        if (this.props.remainingMoney) {
            data.push({
                key: 'Remaining',
                value: this.props.remainingMoney,
                color: getColor(colorNumber)
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

          const config = [
              {color: '#276A73'},
              {color: '#4ABDAC'},
              {color: '#FC4A1A'},
              {color: '#F7B733'},
              {color: '#DEDCE3'} 
          ];
        
        if (this.props.loading) {
            return (
                <MainLoadingSpinner/>
            )
        } else {
            return (
                <div>
                    <DashboardContainer>
                        <DashboardCard>
                            <Header>Summary</Header>
                            <PortfolioData>
                                <StyledPieChart
                                    data={data} 
                                    clickHandler={
                                        (d) => this.setState({
                                        dataDisplay:
                                        `${d.data.key} Budget: $${d.value.toFixed(2)}/Month`
                                        })
                                    }
                                />
                                <Legend horizontal data={data} dataId={'key'} config={config} styles={customStyle}/>
                            </PortfolioData>
                            <GraphText>
                            {this.state.dataDisplay ? this.state.dataDisplay : 'Click on a segment to show the value'}
                            </GraphText>
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
}

const mapStateToProps = state => {
    let categoryTotal = state.simplify.user.categories.reduce((accumulator, currentCategory) => accumulator + parseFloat(currentCategory.amount), 0);
    let billTotal = state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0);
     
    return  {
        loading: state.simplify.loading,
        categories: state.simplify.user.categories,
        remainingMoney: state.simplify.user.monthlySalary - categoryTotal - billTotal,
        billsTotal: billTotal,
        step: state.simplify.user.setupStep,
        notLoaded: state.simplify.user.id === null
    }
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));