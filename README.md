# 🦑 Bundesdatenkrake

Extraction, versioning and machine-readable provisioning of public data.

## How it works

* Gather public information by running `pnpm crawl` (this is done every night at 4 by GitHub Actions)
* hash it
* Check if the current MD5 matches the entry in the database
* If not, create new snapshot in the database and put snapshot into S3 bucket

## API

See the [deployed Swagger docs](https://bundesdatenkrake.vercel.app/swagger).

## Adding exporters

1. Create an exporter in `/sources/my-source/exporter.ts`.
2. Create a new entry in the `Source` table of your database (ID: `my-source`).
3. Add the exporter to `/sources/exporters.ts` using the ID you chose when adding the source to the database.
4. Add a [JSON-Schema](https://json-schema.org/) file as `/public/schemas/[ID].json`.