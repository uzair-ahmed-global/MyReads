import React, { Component } from 'react'

import * as BooksAPI from '../../BooksAPI'
import Shelf from '../../components/Shelf/Shelf'
import classes from './ShelfContainer.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'


export default class ShelfContainer extends Component {
    state = {
        books: [],
        loading: false
    }

    componentDidMount() {
        this.updateShelves()
    }

    shelfChangedHandler = (event, bookID) => {
        this.setState({
            ...this.state,
            loading: true
        })

        BooksAPI.update({ id: bookID }, event.target.value)
        .then(res => {
            let shelf = null
            Object.keys(res).forEach(key => {
                res[key].forEach(id => {
                    if (id === bookID) {
                        shelf = key
                    }
                })                    
            })
            this.updateBook(bookID, shelf)
        })
    }

    updateShelves = () => {
        this.setState({
            ...this.state,
            loading: true
        })
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    ...this.state,
                    books: books,
                    loading: false
                })
            })
    }

    updateBook = (bookID, shelf) => {
        const oldBookIndex = this.state.books.findIndex(book => {
            return book.id === bookID
        })
        this.setState({
            ...this.state,
            loading: false,
            books: [
                ...this.state.books.slice(0, oldBookIndex),
                {
                    ...this.state.books[oldBookIndex],
                    shelf: shelf
                },
                ...this.state.books.slice(oldBookIndex + 1)
            ]
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

        let shelves = (
            <div className={classes.ListBooksContent}>
                <Shelf name='Currently Reading' books={currentlyReadingBooks} shelfChangedHandler={this.shelfChangedHandler} />
                <Shelf name='Want to Read' books={wantToReadBooks} shelfChangedHandler={this.shelfChangedHandler} />
                <Shelf name='Read' books={readBooks} shelfChangedHandler={this.shelfChangedHandler} />
            </div>
        )

        if (this.state.loading) {
            shelves = <Spinner/>
        }

        return (
            <div>
                <div className={classes.ListBooksTitle}>
                    <h1>MyReads</h1>
                    <div className={classes.OpenSearch}>
                        <button onClick={() => this.props.history.push('/search')}>Search</button>
                    </div>
                </div>
                {shelves}
            </div>
        )
    }
}
