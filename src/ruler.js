//  ┏━┓╻ ╻╻  ┏━╸┏━┓
//  ┣┳┛┃ ┃┃  ┣╸ ┣┳┛
//  ╹┗╸┗━┛┗━╸┗━╸╹┗╸

import { getDeltaE00 as getDeltaEDistance } from 'delta-e'

import { rgbToLab } from './converters'
import { compose, zipObj } from './utility'

export const measureDistance = (...rgbs) =>
  getDeltaEDistance(...rgbs.map(compose(zipObj(['L', 'A', 'B']), rgbToLab)))

export const findSimilarDefinition = (definitions) => (rgb) => {
  const getNearestDefinition = (nearest) => (current) =>
    nearest == null || nearest.distance > current.distance ? current : nearest

  const traverseDefinitions = (nearest, idx = 0) => {
    if (idx === definitions.length) return nearest

    const def = definitions[idx]
    const current = { ...def, distance: measureDistance(rgb, def.rgb) }

    return current.distance === 0
      ? current
      : traverseDefinitions(getNearestDefinition(nearest)(current), idx + 1)
  }

  return traverseDefinitions()
}
