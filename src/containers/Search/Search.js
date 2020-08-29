import React, { Component } from 'react'

import classes from './Search.module.css'

export default class Search extends Component {
    render() {
        return (
            (
                <div className={classes.SearchBooks}>
                    <div className={classes.SearchBar}>
                        <button className={classes.CloseSearch} onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                        <div className={classes.SearchBarInputWrapper}>
                            <input type="text" placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className={classes.SearchResults}>
                        <ol className={classes.BooksGrid}>
                            
                        </ol>
                    </div>
                </div>
            )
        )
    }
}
