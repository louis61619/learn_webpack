import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "Hello React22"
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/home">首頁</Link>
          <Link to="/about">關於</Link>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </BrowserRouter>
        <h2>{ this.state.message }</h2>
      </div>
    )
  }
}
