import React from 'react';
import {PieChart} from 'react-easy-chart';

export class ResponsivePieChart extends React.Component {
    constructor(props) {
        super(props);
        const initialWidth = window.innerWidth > 0 ? window.innerWidth : 400;
        this.state = { 
            windowWidth: initialWidth - 100
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth - 100});
    }

    render() {

        let chartSize;
        if (this.state.windowWidth > 685) {
            chartSize = 400;
        } else if (this.state.windowWidth > 200) {
            chartSize =  this.state.windowWidth / 2;
        } else {
            chartSize = 100;
        }
    
        return (
            <div className={this.props.className}>
                <PieChart 
                    size={chartSize}
                    innerHoleSize={chartSize/ 1.75} 
                    data={this.props.data} 
                    mouseOverHandler={this.props.mouseOverHandler.bind(this)}
                    mouseOutHandler={this.props.mouseOutHandler.bind(this)}
                    mouseMoveHandler={this.props.mouseMoveHandler.bind(this)}
                />
            </div>
        )
    }
}