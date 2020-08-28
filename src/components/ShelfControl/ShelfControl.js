import React from 'react'
import classes from './ShelfControl.module.css'

const ShelfControl = (props) => {
    let controls = props.options.map(option => {
        return <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}>
            {option.text}
        </option>
    })
    return (
        <div className={classes.ShelfControl}>
            <select onChange={props.shelfChangedHandler} value={props.shelf}>
                {controls}
            </select>
        </div>
    )
};

export default ShelfControl;