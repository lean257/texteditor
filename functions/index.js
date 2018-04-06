// these lines load the firebase-functions and firebase-admin modules
// and initialize an admin app instance from which Realtime Database changes can be made
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// set the initial room state
exports.initializeState = functions.database.ref('/rooms/{room}')
  .onCreate((snapshot, context) => {
      console.log(snapshot.ref)
      return snapshot.ref.set({
        run: false,
        result: ""
  })})
// once Run button is clicked, eval() these functions?
exports.runCode = functions.database.ref('/rooms/{room}/run')
  .onUpdate(event => {
    const resultRef = event.data.ref.parent.child('result')
    return event.data.ref.child('value').once('value').then(snapshot => {
        const code = snapshot.val()
        const result = eval(code) // eslint-disable-line
        console.log('code inside fnc', code)
        console.log('result inside fnc', result)
        return resultRef.update({result})
    })
  })