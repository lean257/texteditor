import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fire from './firebase'
import TextField from 'material-ui/TextField';

const db = fire.database()

class App extends Component {
  constructor() {
    super()
    this.state = {value: ''}
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
    console.log('value', e.target.value)
    db.ref(`/room`).set({
      value: this.state.value
    })
  }
  componentWillMount() {
    db.ref(`/room/value`).on('value', snapshot => {
      const value = snapshot.val()
      this.setState({value})
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Real time editor</h2>
        </div>
          <TextField 
            id="text-field-controlled"
            value={this.state.value || ''}
            onChange={this.handleChange}
            multiLine={true}
            rowsMax = {100}
          />
      </div>
    );
  }
}
export default App;