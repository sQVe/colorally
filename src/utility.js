//  ╻ ╻╺┳╸╻╻  ╻╺┳╸╻ ╻
//  ┃ ┃ ┃ ┃┃  ┃ ┃ ┗┳┛
//  ┗━┛ ╹ ╹┗━╸╹ ╹  ╹

export const add = x => x + x
export const compose = (...fns) =>
  fns.reduce ((f, g) => (...args) => f (g (...args)))

// export const isString = x => typeof x === 'string'
export const take = n => arr => arr.slice (0, n)
export const zipObj = ks => vs =>
  ks.reduce ((acc, k, idx) => ({ ...acc, [k]: vs[idx] }), {})
