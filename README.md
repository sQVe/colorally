<h1 align="center">
  <img width="500" src="/docs/splash.png?raw=true" alt="splash" >
  <br>
  <br>
</h1>

> 🎨 **colorally** - Name colors by well-known definitions.

[![NPM][npm-badge]][npm]
[![build][travis-badge]][travis]
[![coveralls][coveralls-badge]][coveralls]
[![dependabot][dependabot-badge]][dependabot]
[![semantic-release][semantic-release-badge]][semantic-release]
[![license][license-badge]][license]

Provide a color and colorally will measure the [color difference][color-difference] against a set of well-known definitions and return the name of the closest match. Available as a command-line application, CommonJS and ES module.

## Why

- Consistent color names between projects.
- End the use of non descriptive color names, ie. `color-faded-gray`.
- Measures difference by delta-e (difference perceived by the human eye).
- Over 950 different color definitions.
- Allows input and output in multiple formats.

## Install

Using [npm][npm-install]:

```sh
# Install locally.
$ npm install colorally

# Install globally.
$ npm install --global colorally
```

Using [yarn][yarn-install]:

```sh
# Install locally.
$ yarn add colorally

# Install globally.
$ yarn global add colorally
```

Build from source:

```sh
$ git clone git@github.com:sQVe/colorally.git
$ cd colorally/
$ npm install && npm run build
```

## Command-line application

You can either install the application, see above, or run it temporarily with `npx colorally`.

```
colorally - Name colors by well-known definitions

USAGE

  colorally [option...] [hex]
  colorally [option...] [red] [green] [blue]

  The hex argument can contain either 3 or 6 digits with an optional leading
  0x or #.

  The red, green and blue arguments may only contain digits.

OPTIONS

  -V, --version            output version number
  -c, --copy               copy definition to clipboard
  -f, --format case        output definition in specified format
  -h, --help               output usage information
  -v, --verbose            provide a more talkative result

  The case argument can be either camel fooBar, constant FOO_BAR, dot foo.bar,
  kebab foo-bar, lower foo bar, pascal  FooBar, snake foo_bar title Foo Bar or
  upper FOO BAR. By default, colorally sets case as title.
```

## API

**colorally** is available as a CommonJS and ES module.

```js
import colorally from 'colorally'

// Onyx.
colorally(0x111111)
colorally(119227)

// Light Gray.
colorally('ccc')
colorally('0xccc')
colorally('#cccc')
colorally('cccccc')
colorally('0xcccccc')
colorally('#ccccccc')

// Fuzzy Wuzzy.
colorally([200, 100, 100])
```

#### `colorally(value)`

###### Parameters

- `value` (`number`, `string` or `[number, number, number]`) - A color value

###### Returns

The closest matching definition object together with its measured distance:

```javascript
{
  distance: number,
  name: string,
  rgb: [number, number, number]
}
```

## Contributing

###### Bug reports & feature requests

Please use the [issue tracker][issue-tracker] to report bugs or make feature requests.

###### Developing

Pull requests are more than welcome. The following will get you started:

1. [Fork][how-to-fork] this repository to your own GitHub account and then [clone][how-to-clone] it to your local device.
2. Run `npm install` in the created directory to install all necessary dependencies.

###### Style guide & conventions

Follow [functional programming][functional-programming] best practices - use pure functions and composition when possible. Write commit messages with [Angular Commit Message Conventions][angular-commit-conventions]. This enables [`semantic-release`][semantic-release] to do all kinds of automatic goodies (release, changelong and more). Linting and formatting is heavily enforced on both `pre-commit` and on push to [Travis][travis].

## Shout-out

Color definition sources:

- [Colorhexa][colorhexa-definitions]
- [Wikipedia][wikipedia-definitions]

## License

```
MIT License
```

<!-- References -->

[angular-commit-conventions]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[color-difference]: https://en.wikipedia.org/wiki/Color_difference
[colorhexa-definitions]: https://www.colorhexa.com/color-names
[coveralls-badge]: https://coveralls.io/repos/github/sQVe/colorally/badge.svg
[coveralls]: https://coveralls.io/github/sQVe/colorally
[dependabot-badge]: https://api.dependabot.com/badges/status?host=github&repo=sQVe/colorally
[dependabot]: https://dependabot.com
[functional-programming]: https://en.wikipedia.org/wiki/Functional_programming
[how-to-clone]: https://help.github.com/articles/cloning-a-repository
[how-to-fork]: https://help.github.com/articles/fork-a-repo
[issue-tracker]: https://github.com/sQVe/colorally/issues
[license-badge]: https://img.shields.io/github/license/sqve/colorally.svg
[license]: https://github.com/sQVe/colorally/blob/develop/LICENSE
[npm-badge]: https://img.shields.io/npm/v/colorally.svg
[npm-install]: https://docs.npmjs.com/cli/install
[npm]: https://www.npmjs.com/package/colorally
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release]: https://github.com/semantic-release/semantic-release
[travis-badge]: https://travis-ci.org/sQVe/colorally.svg?branch=master
[travis]: https://travis-ci.org/sQVe/colorally
[wikipedia-definitions]: https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F
[yarn-install]: https://yarnpkg.com/en/docs/getting-started
