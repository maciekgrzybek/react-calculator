import React from 'react'

const Button = (props) => (
    <div className={"Button Button-" + props.wordLabel}  onClick={() => props.onClick()}>
        {props.label}
    </div>
) 

export default Button 