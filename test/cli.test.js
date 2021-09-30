//  ┏━╸╻  ╻   ╺┳╸┏━╸┏━┓╺┳╸
//  ┃  ┃  ┃    ┃ ┣╸ ┗━┓ ┃
//  ┗━╸┗━╸╹    ╹ ┗━╸┗━┛ ╹

jest.mock('clipboardy')

global.console.log = jest.fn()
global.process.exit = jest.fn()

import chalk from 'chalk'
import { writeSync as writeToClipboard } from 'clipboardy'

import { version } from '../package.json'
import { run } from '../src/cli'

const formatFixtures = [
  { format: 'camel', result: 'oxfordBlue' },
  { format: 'constant', result: 'OXFORD_BLUE' },
  { format: 'dot', result: 'oxford.blue' },
  { format: 'kebab', result: 'oxford-blue' },
  { format: 'lower', result: 'oxford blue' },
  { format: 'pascal', result: 'OxfordBlue' },
  { format: 'snake', result: 'oxford_blue' },
  { format: 'title', result: 'Oxford Blue' },
  { format: 'upper', result: 'OXFORD BLUE' },
]

describe('module: cli', () => {
  describe('run', () => {
    beforeEach(() => {
      // Force set truecolor support.
      chalk.level = 3
    })

    it('should use the head value given less than three values', () => {
      run(['#123'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')

      run(['#123', '#000'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')
    })

    it('should use the three first values given more than 2 values', () => {
      run(['123', '123', '123'])
      expect(console.log).toHaveBeenCalledWith('Gray')

      run(['123', '123', '123', '123'])
      expect(console.log).toHaveBeenCalledWith('Gray')
    })

    it('should format case given the -f <case> option', () => {
      run(['-f', 'kebab', '#123'])
      expect(console.log).toHaveBeenCalledWith('oxford-blue')

      run(['-f=kebab', '#123'])
      expect(console.log).toHaveBeenCalledWith('oxford-blue')
    })

    it('should format case given the --format <case> option', () => {
      run(['--format', 'kebab', '#123'])
      expect(console.log).toHaveBeenCalledWith('oxford-blue')

      run(['--format=kebab', '#123'])
      expect(console.log).toHaveBeenCalledWith('oxford-blue')
    })

    it('should ignore format option given no <case value>', () => {
      run(['-f', '#123'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')

      run(['--format', '#123'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')

      run(['-f=', '#123'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')

      run(['--format=', '#123'])
      expect(console.log).toHaveBeenCalledWith('Oxford Blue')
    })

    formatFixtures.forEach(({ format, result }) => {
      it(`should format the definition name in given ${format} format`, () => {
        run(['--format', format, '#123'])

        expect(console.log).toHaveBeenCalledWith(result)
      })
    })

    it('should copy the definition name given the -c option', () => {
      run(['-c', '#000'])

      expect(writeToClipboard).toHaveBeenCalledWith('Black')
    })

    it('should copy the definition name given the --copy option', () => {
      run(['--copy', '#000'])

      expect(writeToClipboard).toHaveBeenCalledWith('Black')
    })

    it('should only copy the definition name given the --copy and --verbose option', () => {
      run(['--copy', '--verbose', '#000'])

      expect(writeToClipboard).toHaveBeenCalledWith('Black')
    })

    it('should copy the formatted definition name given the --copy and --format option', () => {
      run(['--copy', '--format', 'kebab', '#123'])

      expect(writeToClipboard).toHaveBeenCalledWith('oxford-blue')
    })

    // TODO: copy output, only name when verbose, copies formatted name

    it('should output usage information given -h option', () => {
      run(['-h'])

      expect(console.log.mock.calls).toMatchSnapshot()
      expect(process.exit).toHaveBeenCalledWith(0)
    })

    it('should output usage information given --help option', () => {
      run(['--help'])

      expect(console.log.mock.calls).toMatchSnapshot()
      expect(process.exit).toHaveBeenCalledWith(0)
    })

    it('should output usage information given no value', () => {
      run([''])

      expect(console.log.mock.calls).toMatchSnapshot()
      expect(process.exit).toHaveBeenCalledWith(1)
    })

    it('should output version number given -V option', () => {
      run(['-V'])

      expect(console.log).toHaveBeenCalledWith(`v${version}`)
    })

    it('should output version number given --version option', () => {
      run(['--version'])

      expect(console.log).toHaveBeenCalledWith(`v${version}`)
    })

    it('should provide a more talkative result given -v option', () => {
      run(['-v', '#000'])

      expect(console.log.mock.calls).toMatchSnapshot()
    })

    it('should provide a more talkative result given --verbose option', () => {
      run(['--verbose', '#000'])

      expect(console.log.mock.calls).toMatchSnapshot()
    })

    it('should omit color block when no truecolor support', () => {
      chalk.level = 1
      run(['--verbose', '#000'])
      chalk.level = 2
      run(['--verbose', '#000'])

      expect(console.log.mock.calls).toMatchSnapshot()
    })
  })
})
