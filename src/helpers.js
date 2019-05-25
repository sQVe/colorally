//  ╻ ╻┏━╸╻  ┏━┓┏━╸┏━┓┏━┓
//  ┣━┫┣╸ ┃  ┣━┛┣╸ ┣┳┛┗━┓
//  ╹ ╹┗━╸┗━╸╹  ┗━╸╹┗╸┗━┛

import path from 'path'
import fs from 'fs'

import { compose } from './utility'
import { hexToRgb, strToHex } from './converters'

export const convertToDefinitions = res =>
  res.reduce (
    (acc, def) =>
      isAlternativeDefinition (def) && !isWebDefinition (def)
        ? acc
        : [...acc, createDefinition (def)],
    []
  )

export const createDefinition = ({ name, val }) => ({
  name: compose (
    toTitleCase,
    trimSpecialCharacters,
    removeWebIndicator
  ) (name),
  rgb: compose (
    hexToRgb,
    strToHex
  ) (val),
})

export const ensureUniqueDefinitions = definitions =>
  definitions.reduce (
    (acc, x) =>
      acc.some (y => x.name === y.name || isArrayEqual (x.rgb, y.rgb))
        ? acc
        : [...acc, x],
    []
  )

export const flatten = arr =>
  arr.reduce ((acc, v) => acc.concat (Array.isArray (v) ? flatten (v) : v), [])

export const isArrayEqual = (a, b) =>
  a.length === b.length && a.every ((x, idx) => x === b[idx])

export const isAlternativeDefinition = def => /\(.+\)/.test (def.name)
export const isWebDefinition = def => /\(web\)/i.test (def.name)
export const removeWebIndicator = str => str.replace (/\(web\)$/, '').trim ()
export const toTitleCase = str =>
  str
    .split (/\s+/)
    .map (([head, ...tail]) => head.toUpperCase () + tail.join (''))
    .join (' ')

export const trimSpecialCharacters = str => str.match (/[\w\d-_]+/g).join (' ')

export const sortDefinitions = definitions =>
  [...definitions].sort ((a, b) => a.name.localeCompare (b.name)) // eslint-disable-line fp/no-mutating-methods

export const writeToFile = data => location =>
  fs.writeFileSync (path.resolve (__dirname, location), JSON.stringify (data))
