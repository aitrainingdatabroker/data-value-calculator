# Data value calculator (open reference model)

Roughly what could a company's operational data (support tickets, chat, email threads, CRM history, work orders, quotes) license for to AI labs? This small, dependency-free module answers with a **range**, never a single number, and never an offer.

**Use the live calculator:** [aitrainingdatabroker.com/tools/data-value-calculator](https://aitrainingdatabroker.com/tools/data-value-calculator/?utm_source=github). It asks 9 questions, needs no sign-up, and uses AI Training Data Broker's own private model. This repository is an open, simplified reference of the same idea so you can read how an estimate like this works, test it and change it.

## Why two versions

- **Live calculator:** nine questions, the industry, the country, whether the data is already licensed, and a private model. It is the one to use.
- **This repository:** a transparent model with round numbers. It starts from the published range for approved deals (about **$200,000 to $300,000** for a typical operating company, inside an overall range of **$100,000 to $2 million**) and moves it with a few factors you can read in [`src/estimate.js`](src/estimate.js). The two will not give the same number.

## Install and run

Needs Node 18 or newer. No packages to install.

```
git clone https://github.com/aitrainingdatabroker/data-value-calculator
cd data-value-calculator
node bin/cli.js --people 50 --years 5 --kinds email,chat,crm,tickets --linked --seen never
npm test
```

In code:

```js
import { estimate, dollars } from './src/estimate.js'

const r = estimate({ people: '50', years: '5', kinds: ['email', 'chat', 'crm'], linked: true, seen: 'never' })
console.log(r.fit ? `${dollars(r.low)} to ${dollars(r.high)}` : r.note)
```

Open [`docs/index.html`](docs/index.html) in a browser for a one-page version of the same form.

## The questions

| Field | Values |
|---|---|
| `people` | `u30`, `30`, `50`, `100`, `250`, `1000` (full-time people at peak: under 30, 30 to 49, 50 to 99, 100 to 249, 250 to 999, 1,000 or more) |
| `years` | `u3`, `3`, `5`, `10` (years of records kept on the same tools) |
| `kinds` | any of `chat`, `email`, `crm`, `tickets`, `projects`, `finance`, `docs`, `calls`, `code`, `cad`, `quotes`, `orders` |
| `linked` | true when the same people and jobs show up across your tools |
| `seen` | `never` (no AI lab has seen it), `shown`, `licensed` |

## What moves the estimate

More people and more years of history raise it. Each extra kind of record raises it a little. Records that link across tools raise it. Data that no AI lab has seen is worth the most; data already licensed to others is worth less. Under 30 people the model gives no figure. These are the same things the live calculator and our [guides](https://aitrainingdatabroker.com/sell/?utm_source=github) explain.

## Before any data goes to an AI lab

Personal information has to come out first. See the free [de-identification checklist](https://github.com/aitrainingdatabroker/aitrainingdatabroker/tree/main/checklist) and [how de-identification works](https://aitrainingdatabroker.com/de-identification/?utm_source=github). In a licensing deal the AI lab usually pays for the cleaning, agreed case by case.

## Limits

An estimate, not an offer, a valuation, a quote or legal advice. The real number depends on the data, how clean and complete it is, and the deal. Approved deals range widely, and most are not made public.

## About

Built by [AI Training Data Broker](https://aitrainingdatabroker.com/?utm_source=github): we help companies with 30 or more people license the data they already have to AI labs. We work through the terms with you, and you make the final call.

- Website: [aitrainingdatabroker.com](https://aitrainingdatabroker.com/?utm_source=github)
- Live calculator: [aitrainingdatabroker.com/tools/data-value-calculator](https://aitrainingdatabroker.com/tools/data-value-calculator/?utm_source=github)
- Profile and checklist: [github.com/aitrainingdatabroker/aitrainingdatabroker](https://github.com/aitrainingdatabroker/aitrainingdatabroker)
- Videos: [YouTube](https://www.youtube.com/@aitrainingdatabroker)

Issues and pull requests are welcome. License: MIT.
