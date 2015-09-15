'use strict'

var Struct = require('observ-struct')
var Observ = require('observ')
var valueError = require('value-error')
var Event = require('weakmap-event')
var WeakError = require('weak-error')

module.exports = Submission

function Submission (data) {
  data = data || {}

  return Struct({
    pending: Observ(data.pending || false),
    error: Observ(data.error || null)
  })
}

Submission.submit = function submit (state, fn) {
  state.pending.set(true)
  fn(createHandler(state))
}

var DataEvent = Event()
var ErrorEvent = WeakError()

Submission.onData = DataEvent.listen
Submission.onError = ErrorEvent.listen

function createHandler (state) {
  return function onResult (err, data) {
    state.pending.set(false)

    if (err) {
      state.error.set(valueError(err))
      return ErrorEvent.broadcast(state, err)
    }

    DataEvent.broadcast(state, data)
  }
}
