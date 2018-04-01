import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'

export default class NavBar extends Component {

  render() {

    return (
      <Menu inverted>
        <Button color='green'>Run</Button>
      </Menu>
    )
  }
}