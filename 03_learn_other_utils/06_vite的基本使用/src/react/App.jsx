import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {

  constructor(props) {
    super(props)
    // 當使用建構子，super 關鍵字必須出現在this 關鍵字之前使用 避免重複建構
    this.state = {
      message: "Hello React"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}
