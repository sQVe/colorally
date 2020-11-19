import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import shebang from 'rollup-plugin-add-shebang'
import babel from 'rollup-plugin-babel'

import pkg from './package.json'

const bundleTarget = process.env.BUILD_BUNDLE
const externalDependencies = [
  'core-js',
  'data/colors',
  'fs',
  'path',
  'puppeteer',
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const isArrayLike = (x) => x != null && typeof x[Symbol.iterator] === 'function'
const isNil = (...xs) => xs.some((x) => x == null)
const isObjectLike = (x) => x != null && typeof x === 'object'
const isSameType = (x, y) => !isNil(x, y) && x.constructor === y.constructor
const sanitizeBundle = ({ type, ...rest }) => rest
const removeRelativePath = (dep) => dep.replace(/^(\.{1,2}\/)+/, '')

const presetBundleDefaults = (defaults) => (opts) =>
  Object.entries({ ...defaults, ...opts }).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]:
        isObjectLike(v) && isSameType(v, defaults[k])
          ? isArrayLike(v)
            ? [...defaults[k], ...v]
            : { ...defaults[k], ...v }
          : v,
    }),
    {}
  )

const external = (dependencies) => (id) =>
  dependencies
    .map((dep) => removeRelativePath(id).startsWith(dep))
    .some(Boolean)

const bundle = presetBundleDefaults({
  external: external(externalDependencies),
  input: 'src/index.js',
  output: { exports: 'named', indent: false },
  plugins: [nodeResolve(), commonjs(), json()],
  treeshake: true,
})

const bundles = [
  bundle({
    output: { format: 'cjs', file: `lib/${pkg.name}.js` },
    plugins: [babel()],
    type: 'cjs',
  }),
  bundle({
    output: { format: 'es', file: `lib/${pkg.name}.es.js` },
    plugins: [babel()],
    type: 'es',
  }),
  bundle({
    input: 'src/cli.js',
    output: { format: 'cjs', file: `lib/cli.js` },
    plugins: [
      babel(),
      shebang({
        include: `lib/cli.js`,
      }),
    ],
    type: 'cli',
  }),
  {
    external: external(externalDependencies),
    input: 'src/color-scaper.js',
    output: { format: 'cjs', file: '.tmp/color-scraper.js' },
    plugins: [json()],
    type: 'colors',
  },
]

export default (() =>
  [
    ...(bundleTarget != null
      ? bundles.filter((x) => x.type === bundleTarget)
      : bundles),
  ].map(sanitizeBundle))()
