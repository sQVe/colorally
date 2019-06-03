//  ╻ ╻╺┳╸╻╻  ╻╺┳╸╻ ╻   ╺┳╸┏━╸┏━┓╺┳╸
//  ┃ ┃ ┃ ┃┃  ┃ ┃ ┗┳┛    ┃ ┣╸ ┗━┓ ┃
//  ┗━┛ ╹ ╹┗━╸╹ ╹  ╹     ╹ ┗━╸┗━┛ ╹

import { isArrayEqual, isEmpty } from '../src/utility'

describe('module: utility', () => {
  describe('isEmpty', () => {
    it('should return true given null or undefined', () => {
      expect(isEmpty(null)).toEqual(true)
      expect(isEmpty(undefined)).toEqual(true)
    })

    it('should return true given empty objects', () => {
      expect(isEmpty([])).toEqual(true)
      expect(isEmpty({})).toEqual(true)
      expect(isEmpty('')).toEqual(true)
    })

    it('should return false given non empty objects', () => {
      expect(isEmpty([1])).toEqual(false)
      expect(isEmpty([{}])).toEqual(false)
      expect(isEmpty({ foo: 'bar' })).toEqual(false)
      expect(isEmpty('foobar')).toEqual(false)
    })
  })

  describe('isArrayEqual', () => {
    it('should return true given two equal arrays', () => {
      expect(isArrayEqual(['A', 'B'], ['A', 'B'])).toEqual(true)
    })

    it('should return false given two unequal arrays', () => {
      expect(isArrayEqual(['A'], ['A', 'B'])).toEqual(false)
    })
  })
})
