//  ┏━┓╻ ╻╻  ┏━╸┏━┓
//  ┣┳┛┃ ┃┃  ┣╸ ┣┳┛
//  ╹┗╸┗━┛┗━╸┗━╸╹┗╸

import { getDeltaE00 as getDeltaEDistance } from 'delta-e'

import { compose, zipObj } from './utility'
import { rgbToLab } from './converters'

export const measureDistance = (...rgbs) =>
  getDeltaEDistance (
    ...rgbs.map (
      compose (
        zipObj (['L', 'A', 'B']),
        rgbToLab
      )
    )
  )

export const findSimilarDefinition = definitions => rgb => {
  const traverseDefinitions = (nearest, idx = 0) => {
    if (idx === definitions.length) return nearest

    const def = definitions[idx]
    const current = { ...def, distance: measureDistance (rgb, def.rgb) }

    const getNearestDefinition = () =>
      nearest == null || nearest.distance > current.distance ? current : nearest

    return current.distance === 0
      ? current
      : traverseDefinitions (getNearestDefinition (), idx + 1)
  }

  return traverseDefinitions ()
}
