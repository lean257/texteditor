import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import Menu from './Menu'
import fire from './firebase';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
const db = fire.database()

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      language: '',
    }
  }
  
  componentDidMount() {
    const room = this.props.match.params.roomName
    db.ref(`/rooms/${room}/value`).on('value', snapshot => {
      const value = snapshot.val()
      this.setState({value})
    })
    db.ref(`/rooms/${room}/language`).on('value', snapshot => {
      const language = snapshot.val()
      this.setState({language})
    })
  }

  handleChange = (newValue) => {
    this.setState({
      value: newValue
    })
    db.ref(`/rooms/${this.props.match.params.roomName}`).update({
      value: this.state.value,
    })
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: this.state.language,
      theme: 'monokai',
    }
    return (
      <div className="App">
        <header>
          <Menu room={this.props.match.params.roomName}/>
        </header>
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
export default App