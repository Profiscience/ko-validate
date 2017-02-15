ko-validation
================

![NPM](https://img.shields.io/npm/v/ko-validation.svg)
![License](https://img.shields.io/npm/l/ko-validation.svg)
[![Travis](https://img.shields.io/travis/Profiscience/ko-validation.svg)](https://travis-ci.org/Profiscience/ko-validation)
[![Coveralls](https://coveralls.io/repos/github/Profiscience/ko-validation/badge.svg?branch=master)](https://coveralls.io/github/Profiscience/ko-validation?branch=master)
[![DavidDM](https://img.shields.io/david/Profiscience/ko-validation.svg)](https://david-dm.org/Profiscience/ko-validation)

This package will do super awesome things one day. Today is not that day.

## Getting Started

#### Install

```bash
$ yarn add ko-validation
```

_or_

```bash
$ npm install -S ko-validation
```

#### Usage

```
import validate from 'ko-validation'

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
