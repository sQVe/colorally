//  ┏━╸┏━┓╻  ┏━┓┏━┓┏━┓╻  ╻  ╻ ╻   ╺┳╸┏━╸┏━┓╺┳╸
//  ┃  ┃ ┃┃  ┃ ┃┣┳┛┣━┫┃  ┃  ┗┳┛    ┃ ┣╸ ┗━┓ ┃
//  ┗━╸┗━┛┗━╸┗━┛╹┗╸╹ ╹┗━╸┗━╸ ╹     ╹ ┗━╸┗━┛ ╹

jest.mock('../src/converters')
jest.mock('../src/ruler')

import { findSimilarDefinition } from '../src/ruler'
import { hexToRgb, strToHex } from '../src/converters'
import colorally from '../src/colorally'

const fixtures = {
  hex: 0x01027b,
  hexString: '#01027b',
  rgb: [1, 12, 123],
}

const findSimilarDefinitionMock = jest.fn()
findSimilarDefinition.mockImplementation(() =>
  findSimilarDefinitionMock.mockImplementation(rgb => rgb)
)

hexToRgb.mockImplementation(() => fixtures.rgb)
strToHex.mockImplementation(() => fixtures.hex)

describe('module: colorally', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('colorally', () => {
    it('should enforce numbers in given array', () => {
      colorally(fixtures.rgb)
      expect(findSimilarDefinitionMock).toHaveBeenCalledTimes(1)
      expect(findSimilarDefinitionMock).toHaveBeenCalledWith(fixtures.rgb)

      colorally(fixtures.rgb.map(x => x.toString()))
      expect(findSimilarDefinitionMock).toHaveBeenCalledTimes(2)
      expect(findSimilarDefinitionMock).toHaveBeenCalledWith(fixtures.rgb)
    })

    it('should convert a hex string to hex', () => {
      colorally(fixtures.hexString)

      expect(strToHex).toHaveBeenCalledTimes(1)
      expect(strToHex).toHaveBeenCalledWith(fixtures.hexString)
      expect(hexToRgb).toHaveBeenCalledTimes(1)
      expect(hexToRgb).toHaveBeenCalledWith(fixtures.hex)
      expect(findSimilarDefinitionMock).toHaveBeenCalledWith(fixtures.rgb)
    })

    it('should convert hex to RGB', () => {
      colorally(fixtures.hex)

      expect(strToHex).toHaveBeenCalledTimes(0)
      expect(hexToRgb).toHaveBeenCalledTimes(1)
      expect(hexToRgb).toHaveBeenCalledWith(fixtures.hex)
      expect(findSimilarDefinitionMock).toHaveBeenCalledWith(fixtures.rgb)
    })

    it('should try finding a similar definition by RGB', () => {
      colorally(fixtures.rgb)

      expect(strToHex).toHaveBeenCalledTimes(0)
      expect(hexToRgb).toHaveBeenCalledTimes(0)
      expect(findSimilarDefinitionMock).toHaveBeenCalledWith(fixtures.rgb)
    })
  })
})
