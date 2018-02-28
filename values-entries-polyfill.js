/**
 * Polyfill from https://github.com/tc39/proposal-object-values-entries
 * As Firebase Cloud Functions runs on Node.js 6.x
 */

const reduce = Function.bind.call(Function.call, Array.prototype.reduce)
const isEnumerable = Function.bind.call(
  Function.call,
  Object.prototype.propertyIsEnumerable
)
const concat = Function.bind.call(Function.call, Array.prototype.concat)
const keys = Reflect.ownKeys

exports.values = function values (O) {
  return reduce(
    keys(O),
    (v, k) =>
      concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []),
    []
  )
}

exports.entries = function entries (O) {
  return reduce(
    keys(O),
    (e, k) =>
      concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []),
    []
  )
}
