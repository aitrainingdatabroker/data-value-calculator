import test from 'node:test'
import assert from 'node:assert/strict'
import { estimate, FLOOR, CEILING } from '../src/estimate.js'

test('under 30 people gives no figure', () => {
  assert.equal(estimate({ people: 'u30', years: '10' }).fit, false)
})

test('a typical company lands near the published typical range', () => {
  const r = estimate({ people: '50', years: '5', kinds: ['email'], seen: 'shown' })
  assert.equal(r.fit, true)
  assert.ok(r.low >= 150_000 && r.high <= 600_000, `${r.low} to ${r.high}`)
})

test('more history, more kinds and unseen data raise the estimate', () => {
  const small = estimate({ people: '50', years: '3', kinds: ['email'], seen: 'licensed' })
  const big = estimate({ people: '50', years: '10', kinds: ['email', 'chat', 'crm', 'tickets'], linked: true, seen: 'never' })
  assert.ok(big.low > small.low && big.high > small.high)
})

test('the range stays inside the published overall range and low is not above high', () => {
  for (const people of ['30', '50', '100', '250', '1000'])
    for (const years of ['u3', '3', '5', '10'])
      for (const seen of ['never', 'shown', 'licensed']) {
        const r = estimate({ people, years, kinds: ['chat', 'email', 'crm', 'tickets', 'projects', 'finance', 'docs'], linked: true, seen })
        assert.ok(r.low >= FLOOR && r.high <= CEILING && r.low <= r.high)
      }
})

test('bad input is refused', () => {
  assert.throws(() => estimate({ people: 'many', years: '5' }))
  assert.throws(() => estimate({ people: '50', years: 'forever' }))
})
