'use strict'

var test = require('tape')
var nextTick = require('next-tick')
var Submission = require('./')

test('success', function (t) {
  t.plan(3)
  var submission = Submission()

  Submission.submit(submission, function (callback) {
    nextTick(function () {
      callback(null, {foo: 'bar'})
    })
  })

  t.equal(submission.pending(), true)

  Submission.onData(submission, function onData (data) {
    t.deepEqual(data, {foo: 'bar'})
    t.equal(submission.pending(), false)
  })

  Submission.onError(submission, t.fail)
})

test('error', function (t) {
  t.plan(3)
  var submission = Submission()

  Submission.submit(submission, function (callback) {
    nextTick(function () {
      callback(new Error('oh noes'))
    })
  })

  Submission.onError(submission, function onError (err) {
    t.equal(err.constructor, Error)
    t.equal(err.message, 'oh noes')
    t.deepEqual(submission.error(), {
      message: 'oh noes'
    })
  })

  Submission.onData(submission, t.fail)
})
