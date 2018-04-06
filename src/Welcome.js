import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import fire from './firebase'
const db = fire.database()

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coder: "Code Monkey",
            room: "Room 1"
        }
    }

    saveRoomData(field, e) {
        var change = {}
        change[field] = e.target.value
        this.setState(change)
    }

    handleSubmit = () => {
        const { room, coder } = this.state
        db.ref(`rooms/${room}`).set({room, coder})
        this.props.history.push(`/rooms/${room}`)
    }
    render() {
        return (
            <Form>
                <Form.Field>Hi! Welcome!</Form.Field>
                <Form.Field>
                    <label>Tell us your name!</label>
                    <input placeholder='Code Monkey' 
                    onChange={this.saveRoomData.bind(this, 'coder')}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Room Name</label>
                    <input placeholder='Coding Room'
                    onChange={this.saveRoomData.bind(this, 'room')}
                    />
                </Form.Field>
                <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }
}