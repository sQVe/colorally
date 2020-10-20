const { NODE_ENV } = process.env

const common = { targets: { node: 10 } }

module.exports = {
  presets: [
    [
      '@babel/env',
      NODE_ENV === 'test' ? common : { ...common, loose: true, modules: false },
    ],
  ],
}
