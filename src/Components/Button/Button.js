import React from 'react'

const Button = (props) => (
    <div className="Button" onClick={() => props.onClick()}>{props.label}</div>
) 

export default Button 