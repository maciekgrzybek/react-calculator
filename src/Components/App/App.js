import React, { Component } from 'react';
import math from 'mathjs';
import Display from '../Display/Display';
import Button from '../Button/Button';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			display: 0,
			calculated: false,
			score: 0
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress.bind(this));
	}
	

	handleKeyPress(e) {
		let keyPressed =e.key;
		let pressedValue;
		let pressedLabel;
		if(!e.shiftKey){
			switch (keyPressed){
				case '0':
					pressedValue = pressedLabel = 0;
					break;
				case '1':
					pressedValue = pressedLabel = 1;
					break;
				case '2':
					pressedValue = pressedLabel = 2;
					break;
				case '3':
					pressedValue = pressedLabel = 3;
					break;
				case '4':
					pressedValue = pressedLabel = 4;
					break;
				case '5':
					pressedValue = pressedLabel = 5;
					break;
				case '6':
					pressedValue = pressedLabel = 6;
					break;
				case '7':
					pressedValue = pressedLabel = 7;
					break;
				case '8':
					pressedValue = pressedLabel = 8;
					break;
				case '9':
					pressedValue = pressedLabel = 9;
					break;
				case 'c':
				case 'Backspace':
				case 'Escape':
				case 'Delete':
					pressedValue = pressedLabel = 'C';
					break;
				case '/':
					pressedValue = '/';
					pressedLabel = '÷';
					break;
				case '*':
					pressedValue = '*';
					pressedLabel = 'x';
					break;
				case '-':
					pressedValue = pressedLabel = '-';
					break;
				case '+':
					pressedValue = pressedLabel = '+';
					break;	
				case '=':
				case 'Enter':
					pressedValue = pressedLabel = '=';
					break;
				case '.':
				case ',':
					pressedValue = pressedLabel = '.';
					break;			
				default:
					return;
			}
		} else if (e.shiftKey) {
			switch (keyPressed){
				case '+':
					pressedValue = pressedLabel = '+';
					break;			
				default:
					return;
				
			}
		}
		this.handleClick(pressedValue,pressedLabel);
	}

	displayNum(childValue,childLabel){
		if(!this.state.display || this.state.calculated) {
			this.setState({calculated: false})
			this.setState({display: childLabel.toString()});
			this.setState({score: childValue.toString()});
		} else {
			this.setState({display: this.state.display + childLabel.toString()});
			this.setState({score: this.state.score + childValue.toString()});
		}
	}

	sumUp(){
		let result;
		try {
			result = math.eval(this.state.score);
			this.setState({display: result});
			this.setState({calculated:true});
		} catch (e) {
			return;
		}

	}

	renderButton(value,label){
		return (
			<Button onClick={() => this.handleClick(value,label)} value={value} label={label}  />
		)
	}

	clear(){
		this.setState({display: 0})
	}

	handleClick(value,label) {
		if (value === 'C') {
			return this.clear()
		} else if (value === '='){
			return this.sumUp()
		} else {
			return this.displayNum(value,label) 
		}
	}

	render() {
		return (
			<div className="App" >
				<Display display={this.state.display}/>
				<div className="button-row">
					{this.renderButton('C','C')}	
				</div>
				<div className="button-row">
					{this.renderButton(7,7)}
					{this.renderButton(8,8)}
					{this.renderButton(9,9)}
					{this.renderButton('/','÷')}
				</div>
				<div className="button-row">
					{this.renderButton(4,4)}
					{this.renderButton(5,5)}
					{this.renderButton(6,6)}
					{this.renderButton('*','x')}

				</div>
				<div className="button-row">
					{this.renderButton(1,1)}
					{this.renderButton(2,2)}
					{this.renderButton(3,3)}
					{this.renderButton('-','-')}
				</div>
				<div className="button-row">
					{this.renderButton(0,0)}
					{this.renderButton('.','.')}
					{this.renderButton('+','+')}
					{this.renderButton('=','=')}
				</div>
				<h1>React calculator</h1>
			</div>
		);
	}
}

export default App;
