# 🦑 Open Data Aggregator

Extraction, versioning and machine-readable provisioning of public data.

## How it works

- Gather public information by running `bun run crawl` (this is done every night at 4 by GitHub Actions)
- update data files
- if not, create a PR that updates data files

## API

See the [Swagger docs](https://redocly.github.io/redoc/?url=https://www.krake.dev/openapi.json).

## Adding exporters

1. Create a source in `/sources/my-source/index.ts`.
2. Create an exporter in `/sources/my-source/exporter.ts`.
3. Add source to `/sources/index.ts`.
4. Add exporter to `/sources/exporter.ts`.
