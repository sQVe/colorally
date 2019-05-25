//  ┏━┓╻ ╻╻  ┏━╸┏━┓   ╺┳╸┏━╸┏━┓╺┳╸
//  ┣┳┛┃ ┃┃  ┣╸ ┣┳┛    ┃ ┣╸ ┗━┓ ┃
//  ╹┗╸┗━┛┗━╸┗━╸╹┗╸    ╹ ┗━╸┗━┛ ╹

import { definitions, getDefinitionByName } from './setup'
import { findSimilarDefinition, measureDistance } from '../src/ruler'

describe('Ruler', () => {
  describe('measureDistance', () => {
    it('should measure the distance between white and black', () =>
      expect(
        measureDistance(
          getDefinitionByName('White').rgb,
          getDefinitionByName('Black').rgb
        )
      ).toEqual(100.00000085247008))

    it('should measure the distance between black and black', () =>
      expect(
        measureDistance(
          getDefinitionByName('Black').rgb,
          getDefinitionByName('Black').rgb
        )
      ).toEqual(0))

    it('should measure the distance between black and lightened black', () =>
      expect(
        measureDistance(getDefinitionByName('Black').rgb, [10, 10, 10])
      ).toEqual(1.5881488296869715))

    it('should measure the distance between black and red tinted black', () =>
      expect(
        measureDistance(getDefinitionByName('Black').rgb, [10, 0, 0])
      ).toEqual(3.7095842797141665))

    it('should measure the distance between black and green tinted black', () =>
      expect(
        measureDistance(getDefinitionByName('Black').rgb, [0, 10, 0])
      ).toEqual(5.898345162587695))

    it('should measure the distance between black and blue tinted black', () =>
      expect(
        measureDistance(getDefinitionByName('Black').rgb, [0, 0, 10])
      ).toEqual(3.9407659973271505))

    it('should measure the distance between red and green', () =>
      expect(
        measureDistance(
          getDefinitionByName('Red').rgb,
          getDefinitionByName('Green').rgb
        )
      ).toEqual(72.18522864490578))

    it('should measure the distance between green and blue', () =>
      expect(
        measureDistance(
          getDefinitionByName('Green').rgb,
          getDefinitionByName('Blue').rgb
        )
      ).toEqual(62.655622825086056))

    it('should measure the distance between gray and silver', () =>
      expect(
        measureDistance(
          getDefinitionByName('Gray').rgb,
          getDefinitionByName('Silver').rgb
        )
      ).toEqual(19.679102165309864))
  })

  describe('findSimilarDefinition', () => {
    it('should handle a exact match', () => {
      const subject = findSimilarDefinition(definitions)([0, 0, 0])

      expect(subject.name).toEqual('Black')
      expect(subject.distance).toEqual(0)
    })

    it('should find the closest match (Black)', () => {
      const subject = findSimilarDefinition(definitions)([10, 10, 10])

      expect(subject.name).toEqual('Black')
      expect(subject.distance).toEqual(1.5881488296869715)
    })

    it('should find the closest match (White)', () => {
      const subject = findSimilarDefinition(definitions)([250, 250, 250])

      expect(subject.name).toEqual('White')
      expect(subject.distance).toEqual(0.9965226017442006)
    })

    it('should find the closest match (Red)', () => {
      const subject = findSimilarDefinition(definitions)([200, 0, 0])

      expect(subject.name).toEqual('Red')
      expect(subject.distance).toEqual(11.827377587087842)
    })

    it('should find the closest match (Maroon)', () => {
      const subject = findSimilarDefinition(definitions)([150, 0, 0])

      expect(subject.name).toEqual('Maroon')
      expect(subject.distance).toEqual(4.455135911193057)
    })

    it('should find the closest match (Green)', () => {
      const subject = findSimilarDefinition(definitions)([0, 150, 0])

      expect(subject.name).toEqual('Green')
      expect(subject.distance).toEqual(7.852655240305082)
    })

    it('should find the closest match (Lime)', () => {
      const subject = findSimilarDefinition(definitions)([0, 200, 0])

      expect(subject.name).toEqual('Lime')
      expect(subject.distance).toEqual(12.582385494908488)
    })

    it('should find the closest match (Navy)', () => {
      const subject = findSimilarDefinition(definitions)([0, 0, 150])

      expect(subject.name).toEqual('Navy')
      expect(subject.distance).toEqual(3.0821441204911646)
    })

    it('should find the closest match (Blue)', () => {
      const subject = findSimilarDefinition(definitions)([0, 0, 200])

      expect(subject.name).toEqual('Blue')
      expect(subject.distance).toEqual(7.01831936833014)
    })
  })
})
