//  ┏━╸┏━┓┏┓╻╻ ╻┏━╸┏━┓╺┳╸┏━╸┏━┓┏━┓   ╺┳╸┏━╸┏━┓╺┳╸
//  ┃  ┃ ┃┃┗┫┃┏┛┣╸ ┣┳┛ ┃ ┣╸ ┣┳┛┗━┓    ┃ ┣╸ ┗━┓ ┃
//  ┗━╸┗━┛╹ ╹┗┛ ┗━╸╹┗╸ ╹ ┗━╸╹┗╸┗━┛    ╹ ┗━╸┗━┛ ╹

import { hexToRgb, rgbToLab, strToHex } from '../src/converters'
import { definitions } from './setup'

describe('module: converters', () => {
  describe('hexToRgb', () => {
    definitions.forEach(def =>
      it(`should convert hex to RGB (${def.name})`, () =>
        expect(hexToRgb(def.hex)).toEqual(def.rgb))
    )
  })

  describe('strToHex', () => {
    definitions.forEach(def =>
      it(`should convert hex-string to hex (${def.name})`, () =>
        expect(strToHex(def.hexString)).toEqual(def.hex))
    )

    definitions
      .filter(def => def.shortHexString != null)
      .forEach(def =>
        it(`should convert short hex-string to hex (${def.name})`, () =>
          expect(strToHex(def.shortHexString)).toEqual(def.hex))
      )

    it('should handle hex-strings without leading hash', () => {
      expect(strToHex('000000')).toEqual(0x000000)
      expect(strToHex('ffffff')).toEqual(0xffffff)
    })
  })

  describe('rgbToLab', () => {
    definitions.forEach(def =>
      it(`should convert RGB to LAB (${def.name})`, () =>
        expect(rgbToLab(def.rgb)).toEqual(def.lab))
    )
  })
})
