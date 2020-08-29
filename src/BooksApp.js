import React, { Component } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import ShelfContainer from './containers/ShelfContainer/ShelfContainer'
import Search from './containers/Search/Search'

export default class MyBooksApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/search' exact component={Search}/>
                        <Route path='/' exact component={ShelfContainer} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
