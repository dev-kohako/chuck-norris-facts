# Security Policy

## Supported versions

This is a single deployed application, not a released library. Only what is
currently on `main` — and therefore live at
[chuck-norris-facts-kwk.vercel.app](https://chuck-norris-facts-kwk.vercel.app/)
— receives fixes. There are no maintained older versions.

## Reporting a vulnerability

Email **josephkawe000@gmail.com** with enough detail to reproduce it: the
request or interaction, what you expected, and what happened instead. Please do
not open a public issue for anything exploitable.

Expect an acknowledgement within a few days. If the report holds up I will tell
you what the fix is and when it ships; if I disagree that it is a vulnerability
I will say why rather than going quiet.

## Scope

In scope: this repository and the deployed application — the GraphQL gateway in
`server/`, the client in `client/`, and the deployment configuration.

Out of scope: [api.chucknorris.io](https://api.chucknorris.io/), which this
project consumes and does not control. Anything about the upstream data or its
availability goes to them.

## What the application handles

No accounts, no sessions, no personal data, no database. The gateway proxies
public jokes and holds one cached list of categories in memory. The only stored
state is a theme and a language preference, in the visitor's own `localStorage`.

That narrows the interesting surface to the gateway itself: validation at the
GraphQL layer, the origin check in `server/src/app.ts`, and the headers Helmet
sets.
