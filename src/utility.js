//  ╻ ╻╺┳╸╻╻  ╻╺┳╸╻ ╻
//  ┃ ┃ ┃ ┃┃  ┃ ┃ ┗┳┛
//  ┗━┛ ╹ ╹┗━╸╹ ╹  ╹

export const duplicate = x => x + x
export const compose = (...fns) =>
  fns.reduce ((f, g) => (...args) => f (g (...args)))

export const flatten = arr =>
  arr.reduce ((acc, v) => acc.concat (Array.isArray (v) ? flatten (v) : v), [])

export const isArrayEqual = (a, b) =>
  a.length === b.length && a.every ((x, idx) => x === b[idx])

export const isBoolean = val => typeof val === 'boolean'
export const isEmpty = x => x == null || !Object.keys (x).length
export const isString = x => typeof x === 'string'
export const map = fn => arr => arr.map (fn)
export const take = n => arr => arr.slice (0, n)
export const split = x => str => str.split (x)

const toCase = convertWord => separator => str =>
  str
    .toLowerCase ()
    .split (/\s+/)
    .map (convertWord)
    .join (separator)

export const toCamelCase = toCase (([head, ...tail], idx) =>
  idx === 0 ? [head, ...tail].join ('') : head.toUpperCase () + tail.join ('')
) ('')

export const toConstantCase = toCase (word => word.toUpperCase ()) ('_')
export const toDotCase = toCase (word => word.toLowerCase ()) ('.')
export const toKebabCase = toCase (word => word.toLowerCase ()) ('-')
export const toLowerCase = toCase (word => word.toLowerCase ()) (' ')
export const toPascalCase = toCase (
  ([head, ...tail]) => head.toUpperCase () + tail.join ('')
) ('')

export const toSnakeCase = toCase (word => word.toLowerCase ()) ('_')
export const toTitleCase = toCase (
  ([head, ...tail]) => head.toUpperCase () + tail.join ('')
) (' ')

export const toUpperCase = toCase (word => word.toUpperCase ()) (' ')

export const zipObj = ks => vs =>
  ks.reduce ((acc, k, idx) => ({ ...acc, [k]: vs[idx] }), {})
