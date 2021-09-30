//  ╻ ╻┏━╸╻  ┏━┓┏━╸┏━┓┏━┓
//  ┣━┫┣╸ ┃  ┣━┛┣╸ ┣┳┛┗━┓
//  ╹ ╹┗━╸┗━╸╹  ┗━╸╹┗╸┗━┛

import fs from 'fs';
import path from 'path';

import { hexToRgb, strToHex } from './converters';
import { compose, isArrayEqual, toTitleCase } from './utility';

export const convertToDefinitions = (res) =>
  res.reduce(
    (acc, def) =>
      isAlternativeDefinition(def) && !isWebDefinition(def)
        ? acc
        : [...acc, createDefinition(def)],
    []
  );

export const createDefinition = ({ name, val }) => ({
  name: compose(toTitleCase, trimSpecialCharacters, removeWebIndicator)(name),
  rgb: compose(hexToRgb, strToHex)(val),
});

export const ensureUniqueDefinitions = (definitions) =>
  definitions.reduce(
    (acc, x) =>
      acc.some((y) => x.name === y.name || isArrayEqual(x.rgb, y.rgb))
        ? acc
        : [...acc, x],
    []
  );

export const isAlternativeDefinition = (def) => /\(.+\)/.test(def.name);
export const isWebDefinition = (def) => /\(web\)/i.test(def.name);
export const removeWebIndicator = (str) => str.replace(/\(web\)$/, '').trim();
export const trimSpecialCharacters = (str) => str.match(/[\w\d-_]+/g).join(' ');

export const sortDefinitions = (definitions) =>
  [...definitions].sort((a, b) => a.name.localeCompare(b.name));

export const writeToFile = (data) => (location) =>
  fs.writeFileSync(
    path.resolve(__dirname, location),
    JSON.stringify(data, null, 2)
  );
