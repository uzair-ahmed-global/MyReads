import React from 'react'
import classes from './ShelfControls.module.css'

const ShelfControl = (props) => {
    let controls = props.options.map(option => {
        return <option value={option.value} disabled={option.disabled}>{option.text}</option>
    })
    return (
        <div className={classes.ShelfControl}>
            <select>
                {controls}
            </select>
        </div>
    )
};

export default ShelfControls;