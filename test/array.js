// import ko from 'knockout'
// import test from 'tape'
//
// import applyValidationRules from '../src'
//
// test('array', (t) => {
//   t.test('via applyValidationRules', (t) => {
//     const foo = ko.observableArray()
//
//     applyValidationRules(foo, {
//       required: true,
//       min: 3,
//       each: {
//         value: {
//           number: true,
//           min: 0
//         }
//       }
//     })
//
//     t.end()
//   })
//
//   // t.test('via extender', (t) => {
//   //   const foo = ko.observable()
//   //
//   //   foo.extend({ validate: { required: true } })
//   //
//   //   t.false(foo.isValid(), 'adds isValid() computed')
//   //   foo('foo')
//   //   t.true(foo.isValid(), 'validator works')
//   //
//   //   t.end()
//   // })
//
//   t.end()
// })
