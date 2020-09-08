//  ┏━╸┏━┓╻  ┏━┓┏━┓   ┏━┓┏━╸┏━┓┏━┓┏━┓┏━╸┏━┓
//  ┃  ┃ ┃┃  ┃ ┃┣┳┛   ┗━┓┃  ┣┳┛┣━┫┣━┛┣╸ ┣┳┛
//  ┗━╸┗━┛┗━╸┗━┛╹┗╸   ┗━┛┗━╸╹┗╸╹ ╹╹  ┗━╸╹┗╸

import puppeteer from 'puppeteer'

import { compose, flatten } from './utility'
import {
  convertToDefinitions,
  ensureUniqueDefinitions,
  sortDefinitions,
  writeToFile,
} from './helpers'

const processColorhexa = async (browser) => {
  const page = await browser.newPage()

  await page.goto('https://www.colorhexa.com/color-names')
  await page.waitForSelector('table.color-list')

  return page.evaluate(() => {
    const tableBodyElement = document.querySelector('table.color-list > tbody')
    const tableRowElements = tableBodyElement.querySelectorAll('tr')

    return Array.from(tableRowElements).map((tableRowElement) => {
      const [name, val] = tableRowElement.children

      return {
        name: name.firstChild.textContent.trim(),
        val: val.firstChild.textContent.trim(),
      }
    })
  })
}

const processWikipedia = async (browser) => {
  const paths = [
    'List_of_colors:_A%E2%80%93F',
    'List_of_colors:_G%E2%80%93M',
    'List_of_colors:_N%E2%80%93Z',
  ]

  return Promise.all(
    paths.map(async (path) => {
      const page = await browser.newPage()

      await page.goto('https://en.wikipedia.org/wiki/' + path)
      await page.waitForSelector('table.wikitable')

      return page.evaluate(() => {
        const tableBodyElement = document.querySelector(
          'table.wikitable > tbody'
        )
        const tableRowElements = tableBodyElement.querySelectorAll('tr')

        return Array.from(tableRowElements).map((tableRowElement) => {
          const [name, val] = tableRowElement.children

          return {
            name: name.firstChild.textContent.trim(),
            val: val.textContent.trim(),
          }
        })
      })
    })
  )
}

const scrapeSources = async (browser) => {
  const res = await Promise.all([
    processColorhexa(browser),
    processWikipedia(browser),
  ])

  return compose(
    sortDefinitions,
    ensureUniqueDefinitions,
    convertToDefinitions,
    flatten
  )(res)
}

// eslint-disable-next-line fp/no-nil
;(async () => {
  try {
    const browser = await puppeteer.launch()

    writeToFile(await scrapeSources(browser))('../data/colors.json')

    await browser.close()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
