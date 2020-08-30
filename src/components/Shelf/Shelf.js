import React from 'react'

import Book from '../Book/Book'
import classes from './Shelf.module.css'


const Shelf = (props) => {
    let books = props.books.map(book => {
        return <Book
            key={book.id}
            bookID={book.id}
            title={book.title}
            author={book.authors ? book.authors.join(', ') : ''}
            shelf={book.shelf ? book.shelf : 'none'}
            imageUrl={book.imageLinks ? book.imageLinks.thumbnail : ''}
            shelfChangedHandler={props.shelfChangedHandler} />
    })
    return (
        <div className={classes.BookShelf}>
            <h2 className={classes.BookShelfTitle}>{props.name}</h2>
            <div className={classes.BookShelfBooks}>
                <ol className={classes.BooksGrid}>
                    {books}
                </ol>
            </div>
        </div>
    )
}

export default Shelf
