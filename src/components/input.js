import React from 'react';
import styled from 'styled-components';

// Styled Components
const FormError = styled.div`
    font-size: .8em;
    color: #FC4A1A;
    font-weight: bold;
`;

// Input Component
export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if(!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        const Element = this.props.element || 'input';

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <FormError>{this.props.meta.error}</FormError>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = <div className="form-warning">{this.props.meta.error}</div>;
        }

        return (
            <div className={`form-input ${this.props.className ? this.props.className : ''}`}>
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element 
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    step={this.props.step}
                    min={this.props.min}
                    max={this.props.max} 
                    aria-label={this.props.ariaLabel}
                />
            </div>
        );
    }
};