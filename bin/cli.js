#!/usr/bin/env node
// node bin/cli.js --people 50 --years 5 --kinds email,chat,crm --linked --seen never
import { estimate, dollars, PEOPLE, YEARS, KINDS, SEEN } from '../src/estimate.js'

const args = process.argv.slice(2)
const get = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined)

if (args.includes('--help') || !get('--people') || !get('--years')) {
  console.log(`Usage: node bin/cli.js --people <${PEOPLE.join('|')}> --years <${YEARS.join('|')}> [--kinds a,b,c] [--linked] [--seen <${SEEN.join('|')}>]
Kinds: ${KINDS.join(', ')}
Try the live calculator: https://aitrainingdatabroker.com/tools/data-value-calculator/?utm_source=github`)
  process.exit(args.includes('--help') ? 0 : 1)
}

const r = estimate({ people: get('--people'), years: get('--years'), kinds: get('--kinds')?.split(','), linked: args.includes('--linked'), seen: get('--seen') })
console.log(r.fit ? `${dollars(r.low)} to ${dollars(r.high)}` : 'No figure')
console.log(r.note)
console.log('Live calculator (private model, more questions): https://aitrainingdatabroker.com/tools/data-value-calculator/?utm_source=github')
