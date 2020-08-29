import React, { Component } from 'react'

import * as BooksAPI from '../../BooksAPI'
import Shelf from '../../components/Shelf/Shelf'
import classes from './ShelfContainer.module.css'


export default class ShelfContainer extends Component {
    state = {
        books: [],
    }

    componentDidMount() {
        this.updateShelves()
    }

    shelfChangedHandler = (event, bookID) => {
        BooksAPI.update({ id: bookID }, event.target.value)
            .then(_ => {
                this.updateBook(bookID)
            })
    }

    updateShelves = () => {
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    ...this.state,
                    books: books
                })
            })
    }

    updateBook = (bookID) => {
        BooksAPI.get(bookID)
            .then(res => {
                const oldBookIndex = this.state.books.findIndex(book => {
                    return book.id === res.id
                })
                this.setState({
                    ...this.state,
                    books: [
                        ...this.state.books.slice(0, oldBookIndex),
                        {
                            ...res
                        },
                        ...this.state.books.slice(oldBookIndex + 1)
                    ]
                })
            })
    }

    render() {
        let currentlyReadingBooks = []
        let wantToReadBooks = []
        let readBooks = []
        this.state.books.forEach(book => {
            switch (book.shelf) {
                case ('currentlyReading'):
                    currentlyReadingBooks.push({
                        ...book
                    })
                    break
                case ('wantToRead'):
                    wantToReadBooks.push({
                        ...book
                    })
                    break
                case ('read'):
                    readBooks.push({
                        ...book
                    })
                    break
                default:
                    break
            }
        })
        
        return (
            <div>
                <div className={classes.ListBooksTitle}>
                    <h1>MyReads</h1>
                    <div className={classes.OpenSearch}>
                        <button onClick={() => this.props.history.push('/search')}>Search</button>
                    </div>
                </div>
                <div className={classes.ListBooksContent}>
                    <Shelf name='Currently Reading' books={currentlyReadingBooks} shelfChangedHandler={this.shelfChangedHandler} />
                    <Shelf name='Want to Read' books={wantToReadBooks} shelfChangedHandler={this.shelfChangedHandler} />
                    <Shelf name='Read' books={readBooks} shelfChangedHandler={this.shelfChangedHandler} />
                </div>
            </div>
        )
    }
}
