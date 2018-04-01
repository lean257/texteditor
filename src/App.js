import React, { Component } from 'react';
import './App.css';
import Menu from './Menu'
import fire from './firebase';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
const db = fire.database()

class App extends Component {
  constructor() {
    super()
    this.state = {value: ''}
  }
  handleChange = (newValue) => {
    this.setState({
      value: newValue
    })
    db.ref(`/room`).set({
      value: this.state.value
    })
  }
  componentDidMount() {
    db.ref(`/room/value`).on('value', snapshot => {
      const value = snapshot.val()
      this.setState({value})
    })
  }
  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai',
    }
    return (
      <div className="App">
        <header><Menu /></header>
        <CodeMirror
          value={this.state.value} 
          options={options}
          onBeforeChange={(editor, data, value) => {
            this.setState({value});
          }}
          onChange={(editor, data, value) => {
            this.handleChange(value)
          }}
         />
      </div>
    );
  }
}
export default App;