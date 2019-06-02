//  ╻ ╻╺┳╸╻╻  ╻╺┳╸╻ ╻
//  ┃ ┃ ┃ ┃┃  ┃ ┃ ┗┳┛
//  ┗━┛ ╹ ╹┗━╸╹ ╹  ╹

export const add = x => x + x
export const compose = (...fns) =>
  fns.reduce ((f, g) => (...args) => f (g (...args)))

export const flatten = arr =>
  arr.reduce ((acc, v) => acc.concat (Array.isArray (v) ? flatten (v) : v), [])

export const isArrayEqual = (a, b) =>
  a.length === b.length && a.every ((x, idx) => x === b[idx])

export const isEmpty = x => x == null || !(Object.keys (x) || x).length
export const isString = x => typeof x === 'string'
export const take = n => arr => arr.slice (0, n)
export const zipObj = ks => vs =>
  ks.reduce ((acc, k, idx) => ({ ...acc, [k]: vs[idx] }), {})
