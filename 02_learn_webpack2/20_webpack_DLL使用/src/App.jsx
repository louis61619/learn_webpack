import React, { Component } from 'react'
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
        <h2>{ this.state.message }</h2>
      </div>
    )
  }
}
