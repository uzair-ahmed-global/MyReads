import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'

import ShelfContainer from './containers/ShelfContainer/ShelfContainer'

export default class MyBooksApp extends Component {
    render() {
        return <ShelfContainer/>
    }
}
