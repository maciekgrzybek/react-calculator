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
			<div className="App">
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
