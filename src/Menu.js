import React, { Component } from 'react'
import { Menu, Button, Dropdown } from 'semantic-ui-react'
import fire from './firebase';
const db = fire.database()

export default class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      language: '',
    }
  }
  
  handleChangeLanguage = (event, data) => {
    this.setState({
      language: data.value,
    })
    db.ref(`/rooms/${this.props.room}`).update({
      language: data.value
    })
  }

  handleRun = () => {
    // set run state to true

    // call firebase functions 
  }

  render() {
    const languageOptions = [
      { key: 'Javascript', text: 'Javascript', value: 'javascript' },
      { key: 'Python', text: 'Python', value: 'python' },
      { key: 'Ruby', text: 'Ruby', value: 'ruby' },
      { key: 'Java', text: 'Java', value: 'text/x-java' },
      { key: 'Go', text: 'Go', value: 'text/x-go' },
    ]
    return (
      <Menu inverted>
        <Button color='green'>Run</Button>
        <Dropdown placeholder='Javascript' search selection options={languageOptions} onChange={this.handleChangeLanguage}/>
      </Menu>
    )
  }
}