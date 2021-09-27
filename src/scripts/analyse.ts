import { readFileSync, writeFileSync } from 'fs'
import yargs from 'yargs'
import { analyse } from '../analysis'
import seed from '../db/seed'
import { Token } from '../types'

const argv = yargs(process.argv.slice(2)).options({
  json: {
    type: 'string',
    default: 'src/data/collection.json',
    describe: 'Path to the token attribute file',
  },
  saveJson: {
    type: 'boolean',
    default: false,
    describe: 'Use this flag to save data into a json file',
  },
  db: {
    type: 'boolean',
    default: true,
    describe: 'If true, adds data to database',
  }
}).argv

if ('json' in argv) {
  console.log('Analysing data...')
  const rawData = readFileSync(argv.json, { encoding: 'utf-8' })
  const tokens: Token[] | { tokens: Token[] } = JSON.parse(rawData)
  const collection = analyse(tokens)

  if (argv.saveJson) {
    writeFileSync(
      'src/data/' + 'collection-rarities.json',
      JSON.stringify(collection)
    )
    console.log(`\nRarity data written in src/data/collection-rarities.json\n`)
  }

  if (argv.db) {
    console.log('\nInitializing database.')

    seed(collection).then(() => {
      console.log(`\nDatabase initialized.`)
    })
  }
}
