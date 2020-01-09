//  ┏━╸┏━┓┏┓╻╻ ╻┏━╸┏━┓╺┳╸┏━╸┏━┓┏━┓
//  ┃  ┃ ┃┃┗┫┃┏┛┣╸ ┣┳┛ ┃ ┣╸ ┣┳┛┗━┓
//  ┗━╸┗━┛╹ ╹┗┛ ┗━╸╹┗╸ ╹ ┗━╸╹┗╸┗━┛

import { duplicate, compose, take } from './utility'

const omitTypeIndicators = str => str.replace(/^#|0x/, '')
const expandShortHex = str =>
  str.length === 3
    ? Array.from(str)
        .map(duplicate)
        .join('')
    : str
const convertStringToHex = str => parseInt(str, 16)

const rgbToXyz = rgb => {
  const [r, g, b] = rgb.map(x => {
    const y = x / 255
    return y > 0.04045 ? Math.pow((y + 0.055) / 1.055, 2.4) : y / 12.92
  })

  return [
    (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047,
    (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0,
    (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883,
  ].map(x => (x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116))
}

const xyzToLab = ([x, y, z]) => [116 * y - 16, 500 * (x - y), 200 * (y - z)]

export const hexToRgb = hex => {
  const r = hex >> 16
  const g = (hex >> 8) & 0xff
  const b = hex & 0xff

  return [r, g, b]
}

export const strToHex = compose(
  convertStringToHex,
  expandShortHex,
  take(6),
  omitTypeIndicators
)

export const rgbToLab = compose(xyzToLab, rgbToXyz)
