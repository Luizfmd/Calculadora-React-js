import React from 'react';
import './style.css';

export const Button = (props) => {

    let classes = 'button '
    classes += (props.attr === 'operation' ? 'operation ' : '' )
    classes += (props.attr === 'double' ? 'double ' : '' )
    classes += (props.attr === 'triple' ? 'triple ' : '' )
    
    return (
        <button
            type="button"
            className={classes}
            onClick={e => props.click(props.label)}
        >
            {props.label}
        </button>
    )
}
