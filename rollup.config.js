import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import shebang from 'rollup-plugin-add-shebang'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const bundleTarget = process.env.BUILD_BUNDLE
const dependencies = [
  // ...Object.keys (pkg.dependencies || {}),
  ...Object.keys (pkg.peerDependencies || {}),
  'core-js',
  'fs',
  'path',
  'puppeteer',
]
const isArrayLike = x => x != null && typeof x[Symbol.iterator] === 'function'
const isNil = (...xs) => xs.some (x => x == null)
const isObjectLike = x => x != null && typeof x === 'object'
const isSameType = (x, y) => !isNil (x, y) && x.constructor === y.constructor
const sanitizeBundle = ({ type, ...rest }) => rest
const removeRelativePath = dep => dep.replace (/^(\.{1,2}\/)+/, '')

const presetBundleDefaults = defaults => opts =>
  Object.entries ({ ...defaults, ...opts }).reduce (
    (acc, [k, v]) => ({
      ...acc,
      [k]:
        isObjectLike (v) && isSameType (v, defaults[k])
          ? isArrayLike (v)
            ? [...defaults[k], ...v]
            : { ...defaults[k], ...v }
          : v,
    }),
    {}
  )

const externalDependencies = dependencies => id =>
  dependencies.map (dep => removeRelativePath (id).startsWith (dep)).some (Boolean)

const bundle = presetBundleDefaults ({
  external: externalDependencies (dependencies),
  input: 'src/index.js',
  output: { exports: 'named', indent: false },
  plugins: [
    nodeResolve (),
    commonjs ({
      namedExports: {
        'node_modules/delta-e/src/index.js': ['getDeltaE00'],
      },
    }),
    json (),
    shebang ({
      include: `lib/${pkg.name}.js`,
    }),
  ],
  treeshake: true,
})

const bundles = [
  bundle ({
    external: externalDependencies ([...dependencies, 'lib/colors']),
    output: { format: 'cjs', file: `lib/${pkg.name}.js` },
    plugins: [babel ({ runtimeHelpers: true })],
    type: 'cjs',
  }),
  bundle ({
    external: externalDependencies ([...dependencies, 'lib/colors']),
    output: { format: 'es', file: `es/${pkg.name}.mjs` },
    plugins: [babel ({ runtimeHelpers: true })],
    type: 'es',
  }),
  bundle ({
    output: { format: 'umd', file: `dist/${pkg.name}.js`, name: pkg.name },
    plugins: [babel ({ exclude: 'node_modules/**' })],
    type: 'umd',
  }),
  bundle ({
    output: { format: 'umd', file: `dist/${pkg.name}.min.js`, name: pkg.name },
    plugins: [
      babel ({ exclude: 'node_modules/**' }),
      terser ({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
    type: 'umd',
  }),
  {
    external: externalDependencies (dependencies),
    input: 'src/scraper.js',
    output: { format: 'cjs', file: '.tmp/scraper.js' },
    plugins: [json ()],
    type: 'colors',
  },
]

export default (() =>
  [
    ...(bundleTarget != null
      ? bundles.filter (x => x.type === bundleTarget)
      : bundles),
  ].map (sanitizeBundle)) ()
