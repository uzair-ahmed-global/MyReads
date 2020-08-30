import React, { Component } from 'react'

import * as BooksAPI from '../../BooksAPI'
import classes from './Search.module.css'
import Book from '../../components/Book/Book'
import Spinner from '../../components/UI/Spinner/Spinner'

export default class Search extends Component {
    state = {
        searchBooks: [],
        shelfBooks: [],
        loading: false
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: true
        })
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    ...this.state,
                    shelfBooks: books,
                    loading: false
                })
            })
    }


    searchInputChangeHandler = (event) => {
        if (!event.target.value) {
            this.setState({
                ...this.state,
                searchBooks: []
            })
            return
        }
        this.setState({
            ...this.state,
            loading: true
        })

        BooksAPI.search(event.target.value)
            .then(books => {
                this.setState({
                    ...this.state,
                    searchBooks: books.hasOwnProperty('error') ? [] : books,
                    loading: false
                })
            })
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

    updateBook = (bookID, shelf) => {
        const oldBookIndex = this.state.searchBooks.findIndex(book => {
            return book.id === bookID
        })
        this.setState({
            ...this.state,
            loading: false,
            searchBooks: [
                ...this.state.searchBooks.slice(0, oldBookIndex),
                {
                    ...this.state.searchBooks[oldBookIndex],
                    shelf: shelf
                },
                ...this.state.searchBooks.slice(oldBookIndex + 1)
            ]
        })
    }

    render() {
        let books = <p>No books found!</p>
        if (this.state.searchBooks.length !== 0) {
            books = this.state.searchBooks.map(book => {
                let bookShelf = 'none'
                this.state.shelfBooks.forEach(shelvedBook => {
                    if (book.id === shelvedBook.id) {
                        bookShelf = shelvedBook.shelf
                    } else if (book.hasOwnProperty('shelf')) {
                        bookShelf = book.shelf
                    }
                })
                return <Book
                    key={book.id}
                    bookID={book.id}
                    title={book.title}
                    author={book.authors ? book.authors.join(', ') : ''}
                    shelf={bookShelf}
                    imageUrl={book.imageLinks ? book.imageLinks.thumbnail : ''}
                    shelfChangedHandler={this.shelfChangedHandler} />
            })
        }
        
        if (this.state.loading) {
            books = <Spinner/>
        }
        return (
            (
                <div className={classes.SearchBooks}>
                    <div className={classes.SearchBar}>
                        <button className={classes.CloseSearch} onClick={() => this.props.history.push('/')} />
                        <div className={classes.SearchBarInputWrapper}>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={this.searchInputChangeHandler} />
                        </div>
                    </div>
                    <div className={classes.SearchResults}>
                        <ol className={classes.BooksGrid}>
                            {books}
                        </ol>
                    </div>
                </div>
            )
        )
    }
}
