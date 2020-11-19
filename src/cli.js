//  ┏━╸╻  ╻
//  ┃  ┃  ┃
//  ┗━╸┗━╸╹

import chalk from 'chalk'
import { writeSync as writeToClipboard } from 'clipboardy'

import { version } from '../package.json'
import colorally from './colorally'
import {
  compose,
  flatten,
  isBoolean,
  isEmpty,
  map,
  split,
  toCamelCase,
  toConstantCase,
  toDotCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
} from './utility'

const { argv, env } = process

const defaults = {
  options: {
    copy: false,
    format: false,
    help: false,
    verbose: false,
    version: false,
  },
  values: [],
}
const optionDefinitions = [
  { name: 'copy', identifier: /^--?c(opy)?$/ },
  { name: 'format', identifier: /^--?f(ormat)?(=\w+)?$$/, input: /^\w+$/ },
  { name: 'help', identifier: /^--?h(elp)?$/ },
  { name: 'verbose', identifier: /^--?v(erbose)?$/ },
  { name: 'version', identifier: /^(-V)|(--version)$/ },
]

const printHelp = (exitCode) => {
  console.log(
    chalk`{blue colorally} - Name colors by well-known definitions

{bold USAGE}

  {blue colorally} [option...] [{underline hex}]
  {blue colorally} [option...] [{underline red}] [{underline green}] [{underline blue}]

  The {underline hex} argument can contain either {bold 3} or {bold 6 digits} ` +
      chalk`with an optional leading
  {bold 0x} or {bold #}.

  The {underline red}, {underline green} and {underline blue} arguments may only ` +
      chalk`contain digits.

{bold OPTIONS}

  -V, --version            output version number
  -c, --copy               copy definition to clipboard
  -f, --format {underline case}        output definition in specified format
  -h, --help               output usage information
  -v, --verbose            provide a more talkative result

  The {underline case} argument can be either {bold camel} {italic fooBar}, ` +
      chalk`{bold constant} {italic FOO_BAR}, {bold dot} {italic foo.bar},
  {bold kebab} {italic foo-bar}, {bold lower} {italic foo bar}, {bold pascal} ` +
      chalk` {italic FooBar}, {bold snake} {italic foo_bar} {bold title} {italic Foo Bar} or
  {bold upper} {italic FOO BAR}. By default, {blue colorally} sets {underline case} as {bold title}.
  `
  )

  return process.exit(exitCode)
}

const printVersion = () => {
  return console.log('v' + version)
}

const findOption = (str) =>
  optionDefinitions.find((opt) => opt.identifier.test(str))

const parseArgs = (args) => {
  const omitFalsyValues = (arr) => arr.filter(Boolean)
  const parse = (acc) => (idx) => (arr) => {
    const current = arr[idx]
    const next = arr[idx + 1] || false

    const opt = findOption(current)
    const optValue =
      opt && opt.input ? (opt.input.test(next) ? next : false) : true
    const increment = isBoolean(optValue) ? 1 : 2

    if (idx >= arr.length) return acc
    return parse(
      opt != null
        ? {
            options: { ...acc.options, [opt.name]: optValue },
            values: acc.values,
          }
        : { options: acc.options, values: [...acc.values, current] }
    )(idx + increment)(arr)
  }

  const parsedArgs = compose(parse(defaults)(0), flatten, map(split('=')))(args)

  return { ...parsedArgs, values: omitFalsyValues(parsedArgs.values) }
}

const formatDefinitionName = (format) => (name) => {
  const formatMap = {
    camel: toCamelCase,
    constant: toConstantCase,
    dot: toDotCase,
    kebab: toKebabCase,
    lower: toLowerCase,
    pascal: toPascalCase,
    snake: toSnakeCase,
    title: toTitleCase,
    upper: toUpperCase,
  }
  const validFormat =
    (format &&
      Object.keys(formatMap).find((key) => key === format.toLowerCase())) ||
    'title'

  return formatMap[validFormat](name)
}

export const run = (args) => {
  const { options, values } = parseArgs(args)

  if (options.help) return printHelp(0)
  if (options.version) return printVersion()
  if (isEmpty(values)) return printHelp(1)

  const definition = colorally(
    values.length > 2 ? values.slice(0, 3) : values[0]
  )

  const name = formatDefinitionName(options.format)(definition.name)

  if (options.copy) {
    writeToClipboard(name)
  }

  const colorBlock =
    // Only display if terminal supports truecolor.
    chalk.level > 2 ? chalk.bgRgb(...definition.rgb)('   ') + ' ' : ''

  return console.log(
    options.verbose
      ? // prettier-ignore
        chalk`Found ${colorBlock}{bold ${name}} {italic (${definition.rgb.join (', ')})} ` +
        chalk`by a distance of {italic ${definition.distance.toFixed (4)}}.`
      : name
  )
}

// Exclude runner from test coverage.
// istanbul ignore next
if (env.NODE_ENV !== 'test') {
  run(argv.slice(2, argv.length))
}
