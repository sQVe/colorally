//  ┏━╸┏━┓╻  ┏━┓┏━┓┏━┓╻  ╻  ╻ ╻
//  ┃  ┃ ┃┃  ┃ ┃┣┳┛┣━┫┃  ┃  ┗┳┛
//  ┗━╸┗━┛┗━╸┗━┛╹┗╸╹ ╹┗━╸┗━╸ ╹

import { isString } from './utility'
import { hexToRgb, strToHex } from './converters'
import { findSimilarDefinition } from './ruler'
import colors from '../data/colors.json'

/**
 * Find visually similar color definition.
 *
 * @param {(string|number|number[])} color A color value in hex-string, hex or RGB array.
 * @returns {object} A color definition object with name, rgb array and optional match statistics.
 */
export default function colorally(color) {
  const rgb = Array.isArray (color)
    ? color.map (Number)
    : hexToRgb (isString (color) ? strToHex (color) : color)

  return findSimilarDefinition (colors) (rgb)
}
