// Data value calculator: a small, open reference model.
//
// Question it answers: roughly what could a company's operational data (support tickets, chat, email, CRM history,
// work orders, quotes) license for to AI labs? The answer is a RANGE, an estimate and never an offer.
//
// This is an open, simplified model. It starts from the figures AI Training Data Broker publishes for approved deals
// (about $200,000 to $300,000 for a typical operating company, inside an overall range of $100,000 to $2 million), and
// moves that range with a few round factors that anyone can read, argue with and change. The live calculator at
// https://aitrainingdatabroker.com/tools/data-value-calculator/ uses its own private model, so the two will not give
// the same number. Nothing here is a valuation, a quote or legal advice.

export const PEOPLE = ['u30', '30', '50', '100', '250', '1000']
export const YEARS = ['u3', '3', '5', '10']
export const KINDS = ['chat', 'email', 'crm', 'tickets', 'projects', 'finance', 'docs', 'calls', 'code', 'cad', 'quotes', 'orders']
export const SEEN = ['never', 'shown', 'licensed']

// A typical operating company with 50 to 99 people, 5 to 10 years of data, and several kinds of records.
const BASE = { low: 200_000, high: 300_000 }

// Round factors, one per question. Change them to see how the estimate moves.
export const SIZE = { u30: 0, 30: 0.6, 50: 1, 100: 1.6, 250: 2.5, 1000: 4 }
export const HISTORY = { u3: 0.6, 3: 0.85, 5: 1, 10: 1.2 }
export const RECORDS_PER_KIND = 0.08 // each kind of record beyond the first adds this much, up to MAX_KINDS
export const MAX_KINDS = 6
export const LINKED = 1.15 // the same people and jobs show up across your tools
export const NOT_SEEN = { never: 1.2, shown: 0.9, licensed: 0.6 } // data no AI lab has seen is worth the most

// The overall range AI Training Data Broker publishes for approved deals. Estimates are kept inside it.
export const FLOOR = 10_000
export const CEILING = 2_000_000

const roundTo = (n, step) => Math.round(n / step) * step

/**
 * @param {{people: string, years: string, kinds?: string[], linked?: boolean, seen?: string}} a
 * @returns {{fit: boolean, low?: number, high?: number, note: string}}
 */
export function estimate(a) {
  if (!PEOPLE.includes(a.people)) throw new Error(`people must be one of ${PEOPLE.join(', ')}`)
  if (!YEARS.includes(a.years)) throw new Error(`years must be one of ${YEARS.join(', ')}`)
  const seen = a.seen ?? 'never'
  if (!SEEN.includes(seen)) throw new Error(`seen must be one of ${SEEN.join(', ')}`)
  const kinds = [...new Set(a.kinds ?? [])].filter((k) => KINDS.includes(k))

  if (a.people === 'u30')
    return { fit: false, note: 'Under 30 people is usually not enough data for an AI lab. Keep what you have; it grows every month.' }

  let factor = SIZE[a.people] * HISTORY[a.years] * NOT_SEEN[seen]
  factor *= 1 + RECORDS_PER_KIND * (Math.min(Math.max(kinds.length, 1), MAX_KINDS) - 1)
  if (a.linked) factor *= LINKED

  const low = Math.min(Math.max(roundTo(BASE.low * factor, 5_000), FLOOR), CEILING)
  const high = Math.min(Math.max(roundTo(BASE.high * factor, 5_000), low), CEILING)
  return { fit: true, low, high, note: 'An estimate, not an offer. The real number depends on the data, how clean and complete it is, and the deal.' }
}

export const dollars = (n) => '$' + n.toLocaleString('en-US')
