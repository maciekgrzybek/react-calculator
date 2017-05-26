import React, { Component } from 'react'
import math from 'mathjs'
import Display from '../Display/Display'
import Button from '../Button/Button'
import './App.css'

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
		window.addEventListener('keypress', this.handleKeyPress.bind(this));
	}
	
	animateButton(wordLabel){
		var el = document.querySelector(`.Button-${wordLabel}`);
		el.style.bottom = "-1px";
		setTimeout(() => {return el.style.bottom = "0px";},100);
		
	}

	handleKeyPress(e) {
		let keyPressed = e.key || e.keyCode;
		let pressedValue;
		let pressedLabel;
		let wordLabel;
		if(!e.shiftKey){
			switch (keyPressed){
				case '0':
				case 48:
					pressedValue = pressedLabel = 0;
					wordLabel = 'zero';
					break;
				case '1':
				case 49:
					pressedValue = pressedLabel = 1;
					wordLabel = 'one';
					break;
				case '2':
				case 50:
					pressedValue = pressedLabel = 2;
					wordLabel = 'two';
					break;
				case '3':
				case 51:
					pressedValue = pressedLabel = 3;
					wordLabel = 'three';
					break;
				case '4':
				case 52:
					pressedValue = pressedLabel = 4;
					wordLabel = 'four';
					break;
				case '5':
				case 53:
					pressedValue = pressedLabel = 5;
					wordLabel = 'five';
					break;
				case '6':
				case 54:
					pressedValue = pressedLabel = 6;
					wordLabel = 'six';
					break;
				case '7':
				case 55:
					pressedValue = pressedLabel = 7;
					wordLabel = 'seven';
					break;
				case '8':
				case 56:
					pressedValue = pressedLabel = 8;
					wordLabel = 'eight';
					break;
				case '9':
				case 57:
					pressedValue = pressedLabel = 9;
					wordLabel = 'nine';
					break;
				case 'c':
				case 'Backspace':
				case 'Escape':
				case 'Delete':
				case 99:
				case 8:
				case 27:
					pressedValue = pressedLabel = 'C';
					wordLabel = 'cancel';
					break;
				case '/':
				case 47:
					pressedValue = '/';
					pressedLabel = '÷';
					wordLabel = 'divide';
					break;
				case '*':
				case 42:
					pressedValue = '*';
					pressedLabel = 'x';
					wordLabel = 'multiply';
					break;
				case '-':
				case 45:
					pressedValue = pressedLabel = '-';
					wordLabel = 'minus';
					break;
				case '+':
				case 43:
					pressedValue = pressedLabel = '+';
					wordLabel = 'plus';
					break;	
				case '=':
				case 'Enter':
				case 61:
				case 13:
					pressedValue = pressedLabel = '=';
					wordLabel = 'equals';
					break;
				case '.':
				case ',':
				case 44:
				case 46:
					pressedValue = pressedLabel = '.';
					wordLabel = 'dot';
					break;			
				default:
					return;
			}
		} else if (e.shiftKey) {
			switch (keyPressed){
				case '+':
				case 61:
					pressedValue = pressedLabel = '+';
					wordLabel = 'plus';
					break;			
				default:
					return;
				
			}
		}
		this.handleClick(pressedValue,pressedLabel);
		this.animateButton(wordLabel);
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

	renderButton(value,label,wordLabel){
		return (
			<Button  onClick={() => this.handleClick(value,label,wordLabel)} value={value} label={label} wordLabel={wordLabel} />
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
			<div className="App">
				<Display display={this.state.display}/>
				<div className="button-row">
					{this.renderButton('C','C','cancel')}	
				</div>
				<div className="button-row">
					{this.renderButton(7,7,'seven')}
					{this.renderButton(8,8,'eight')}
					{this.renderButton(9,9,'nine')}
					{this.renderButton('/','÷','divide')}
				</div>
				<div className="button-row">
					{this.renderButton(4,4,'four')}
					{this.renderButton(5,5,'five')}
					{this.renderButton(6,6,'six')}
					{this.renderButton('*','x','multiply')}

				</div>
				<div className="button-row">
					{this.renderButton(1,1,'one')}
					{this.renderButton(2,2,'two')}
					{this.renderButton(3,3,'three')}
					{this.renderButton('-','-','minus')}
				</div>
				<div className="button-row">
					{this.renderButton(0,0,'zero')}
					{this.renderButton('.','.','dot')}
					{this.renderButton('+','+','plus')}
					{this.renderButton('=','=','equals')}
				</div>
				<h1>React calculator</h1>
			</div>
		);
	}
}

export default App
