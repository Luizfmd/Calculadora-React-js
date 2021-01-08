import React, { Fragment, Component } from 'react';

import { Button } from '../components/button/component';
import { Display } from '../components/display/component';

export class Calculadora extends Component {

    constructor(props) {
        super(props)

        this.state = {
            displayValue: 0,
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0,
            button: [
              { label: 'AC', typeOfButton: 'clear',     attr: 'triple' },
              { label: '/',  typeOfButton: 'operation', attr: 'operation' },
              { label: '7',  typeOfButton: 'button',    attr: '' },
              { label: '8',  typeOfButton: 'button',    attr: '' },
              { label: '9',  typeOfButton: 'button',    attr: '' },
              { label: '*',  typeOfButton: 'operation', attr: 'operation' },
              { label: '4',  typeOfButton: 'button',    attr: '' },
              { label: '5',  typeOfButton: 'button',    attr: '' },
              { label: '6',  typeOfButton: 'button',    attr: '' },
              { label: '-',  typeOfButton: 'operation', attr: 'operation' },
              { label: '1',  typeOfButton: 'button',    attr: '' },
              { label: '2',  typeOfButton: 'button',    attr: '' },
              { label: '3',  typeOfButton: 'button',    attr: '' },
              { label: '+',  typeOfButton: 'operation', attr: 'operation' },
              { label: '0',  typeOfButton: 'button',    attr: ''  },
              { label: '.',  typeOfButton: 'button',    attr: ''  },
              { label: '=',  typeOfButton: 'operation', attr: 'double' }
            ]
        }
    };

    clearMemory() {
        this.setState({
          displayValue: 0,
          clearDisplay: false,
          operation: null,
          values: [0, 0],
          current: 0
        });
    };

    addDigit(n) {
        // se displayValue já possui um ponto
        if( (n === '.' && this.state.displayValue.toString().includes('.')) || this.state.displayValue.length === 10 )
          return;

        // caso o valor inicial seja 0
        const clearDisplay = this.state.displayValue === 0
            || this.state.clearDisplay;

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n;

        this.setState({ displayValue: displayValue.substr(0, 9), clearDisplay: false });

        if(n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    };

    setOperation(operation) {
        if( this.state.current === 0 ) {
            this.setState({
              operation,
              current: 1,
              clearDisplay: true
            });
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];

            switch( currentOperation ) {
                case '+': values[0] = `${parseFloat(values[0]) + parseFloat(values[1])}`; break;
                case '-': values[0] = `${parseFloat(values[0]) - parseFloat(values[1])}`; break;
                case '/': values[0] = `${parseFloat(values[0]) / parseFloat(values[1])}`; break;
                case '*': values[0] = `${parseFloat(values[0]) * parseFloat(values[1])}`; break;
            }

            this.setState({
                displayValue: values[0].substr(0, 9),
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    };

    render() {
        return (
            <Fragment>
                <main className="calculator">
                    <Display value={ this.state.displayValue } />
                    {this.state.button.map((btn, index) => (
                        <Button
                            label={btn.label}
                            key={index}
                            click={ () => (
                              btn.typeOfButton === 'clear' ?  this.clearMemory() : null ||
                              btn.typeOfButton === 'button' ? this.addDigit(btn.label) : null ||
                              btn.typeOfButton === 'operation' ?  this.setOperation(btn.label) : null
                            )}
                            attr={btn.attr}
                        />
                    ))}
                </main>
            </Fragment>
        );
    };
};
