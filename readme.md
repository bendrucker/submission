# submission [![Build Status](https://travis-ci.org/bendrucker/submission.svg?branch=master)](https://travis-ci.org/bendrucker/submission)

> Observable interface for managing submission submission states


## Install

```
$ npm install --save submission
```


## Usage

```js
var Submission = require('submission')
var submission = Submission()

submission.pending()
//=> false

submission.error()
//=> null

Submission.submit(submission, function (callback) {
  //=> submission.pending() === true
  submit(callback)
})

function submit (callback) {
  //=> submit data to server
  //=> call callback w/ err, data
}

Submission.onData(submission, console.log)
//=> data

Submission.onError(submission, console.log)
//=> null / Error
```

## API

#### `Submission([data])` -> `function`

Returns an observable submission state.

##### data

Type: `object`
Default: `{pending: false, error: null}`

The initial submission state.

#### `Submission.submit(state, fn)` -> `undefined`

##### state

*Required*  
Type: `function`

A submission state observable.

##### fn

*Required*  
Type: `function`  
Arguments: `callback`

A function to call to trigger submission. The function will receive a callback that will update the submission state and trigger events based on the result.

#### `Submission.onData(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A submission state observable.

##### listener

*Required*  
Type: `function`

A function to be called with the submission data passed back from the function provided to `Submission.submit`.

#### `Submission.onError(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A submission state observable.

##### listener

*Required*  
Type: `function`

A function to be called with an error passed back from the function provided to `Submission.submit`.

## License

MIT © [Ben Drucker](http://bendrucker.me)
