'use strict'

var test = require('tape')
var nextTick = require('next-tick')
var Form = require('./')

test('success', function (t) {
  t.plan(3)
  var form = Form()

  Form.submit(form, function (callback) {
    nextTick(function () {
      callback(null, {foo: 'bar'})
    })
  })

  t.equal(form.pending(), true)

  Form.onData(form, function onData (data) {
    t.deepEqual(data, {foo: 'bar'})
    t.equal(form.pending(), false)
  })

  Form.onError(form, t.fail)
})

test('error', function (t) {
  t.plan(3)
  var form = Form()

  Form.submit(form, function (callback) {
    nextTick(function () {
      callback(new Error('oh noes'))
    })
  })

  Form.onError(form, function onError (err) {
    t.equal(err.constructor, Error)
    t.equal(err.message, 'oh noes')
    t.deepEqual(form.error(), {
      message: 'oh noes'
    })
  })

  Form.onData(form, t.fail)
})
