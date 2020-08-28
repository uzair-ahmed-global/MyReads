import React from 'react'
import classes from './Book.module.css'
import ShelfControl from '../ShelfControl/ShelfControl'


const controlOptions = [
    { value: 'move', disabled: true, text: 'Move to...' },
    { value: 'currentlyReading', disabled: false, text: 'Currently Reading' },
    { value: 'wantToRead', disabled: false, text: 'Want to Read' },
    { value: 'read', disabled: false, text: 'Read' },
    { value: 'none', disabled: false, text: 'None' },
]

const Book = (props) => {
    const shelfChangedHandler = (event) => {
        props.shelfChangedHandler(event, props.bookID)
    }

    return (
        <div className={classes.Book}>
            <div className={classes.BookTop}>
                <div className={classes.BookCover} style={{ width: 128, height: 193, backgroundImage: 'url("' + props.imageUrl + '")'}} />
                <ShelfControl options={controlOptions} shelfChangedHandler={shelfChangedHandler} shelf={props.shelf}/>
            </div>
            <div className={classes.BookTitle}>{props.title}</div>
            <div className={classes.bookAuthor}>{props.author}</div>
        </div>
    )
}

export default Book