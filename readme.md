# form-submit-state [![Build Status](https://travis-ci.org/bendrucker/form-submit-state.svg?branch=master)](https://travis-ci.org/bendrucker/form-submit-state)

> Observable interface for managing form submission states


## Install

```
$ npm install --save form-submit-state
```


## Usage

```js
var Form = require('form-submit-state')
var form = form()

form.pending()
//=> false

form.error()
//=> null

Form.submit(form, function (callback) {
  //=> form.pending() === true
  submit(callback)
})

function submit (callback) {
  //=> submit form data to server
  //=> call callback w/ err, data
}

Form.onData(form, console.log)
//=> data

Form.onError(form, console.log)
//=> null / Error
```

## API

#### `Form([data])` -> `function`

Returns an observable form state.

##### data

Type: `object`
Default: `{pending: false, error: null}`

The initial form state.

#### `Form.submit(state, fn)` -> `undefined`

##### state

*Required*  
Type: `function`

A form state observable.

##### fn

*Required*  
Type: `function`  
Arguments: `callback`

A function to call to trigger form submission. The function will receive a callback that will update the form state and trigger events based on the result.

#### `Form.onData(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A form state observable.

##### listener

*Required*  
Type: `function`

A function to be called with the submission data passed back from the function provided to `Form.submit`.

#### `Form.onError(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A form state observable.

##### listener

*Required*  
Type: `function`

A function to be called with an error passed back from the function provided to `Form.submit`.

## License

MIT © [Ben Drucker](http://bendrucker.me)
