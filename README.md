# 🦑 Bundesdatenkrake

Extraction, versioning and machine-readable provisioning of public data.

## How it works

* Gather public information by running `pnpm crawl` (this is done every night at 4 by GitHub Actions)
* hash it
* Check if the current MD5 matches the entry in the database
* If not, create new snapshot in the database and put snapshot into S3 bucket

## API

See the [deployed Swagger docs](https://bundesdatenkrake.vercel.app/swagger).

## Environment variables

* `DATABASE_URL`: pre-authenticated URL to a MySQL-compatible database
* `BUCKET`: name of a S3 Bucket for storing data snapshots
* `ACCESS_KEY`: AWS IAM access key ID. Needs to have `read` and `write` permission to your S3 bucket.
* `ACCESS_KEY_SECRET`: AWS IAM access key secret.

## Adding exporters

1. Create an exporter in `/sources/my-source/exporter.ts`.
2. Create a new entry in the `Source` table of your database (ID: `my-source`).
3. Add the exporter to `/sources/exporters.ts` using the ID you chose when adding the source to the database.