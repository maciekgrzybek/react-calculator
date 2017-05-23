import React from 'react';

class Display extends React.Component {	
	render() {
		return (
			<div className="Display"><h1>{this.props.display}</h1></div>
		);
	}
}

export default Display