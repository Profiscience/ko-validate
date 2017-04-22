ko-validate
================

![NPM](https://img.shields.io/npm/v/ko-validate.svg)
![License](https://img.shields.io/npm/l/ko-validate.svg)
[![Travis](https://img.shields.io/travis/Profiscience/ko-validate.svg)](https://travis-ci.org/Profiscience/ko-validate)
[![Coveralls](https://coveralls.io/repos/github/Profiscience/ko-validate/badge.svg?branch=master)](https://coveralls.io/github/Profiscience/ko-validate?branch=master)
[![DavidDM](https://img.shields.io/david/Profiscience/ko-validate.svg)](https://david-dm.org/Profiscience/ko-validate)

## Getting Started

#### Install

```bash
$ yarn add ko-validate
```

_or_

```bash
$ npm install -S ko-validate
```

#### Usage

```javascript
import validate from 'ko-validate'

const foos = {
  foo: undefined,
  bar: {
    baz: undefined
  }
}

const validationRules = {
  foo: {
    required: true
  },
  bar: {
    baz: {
      required: true,
      number: true
    }
  }
}

validate(foos, validationRules)

foos.isValid() // false
foos.foo.isValid() // false
foos.bar.isValid() // false
foos.bar.baz.isValid() // false

foos.foo('foo')

foos.isValid() // false
foos.foo.isValid() // true
foos.bar.isValid() // false
foos.bar.baz.isValid() // false

foos.bar.baz(1)

foos.isValid() // true
foos.foo.isValid() // true
foos.bar.isValid() // true
foos.bar.baz.isValid() // true

foos.foo(undefined)

foos.isValid() // false
foos.foo.isValid() // false
foos.bar.isValid() // true
foos.bar.baz.isValid() // true
```

#### What About Validation Messages?

Write your own. Make your error messages meaningful. Default/automatic validation messages
feel robotic and often a) lack context, b) use jargon **your users don't understand**.
Custom bindings and components are easy to create for consistent validation messages
across your app.
