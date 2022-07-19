# Bundesdatenkrake

Extraction, versioning and machine-readable provisioning of public data.

## How it works

* Gather public information by running `pnpm crawl` (TODO: run as cron job in GitHub Actions)
* Compress and hash it
* Check if the current MD5 matches the entry in the database
* If not, create new snapshot in the database and put compressed snapshot into S3 bucket

## API

TODO: OpenAPI spec

* `GET /sources`: list of all available sources
* `GET /source/{id}`: get information and snapshot list for given source
* `GET /snapshot/{id}`: get data snapshot

## Environment variables

* `DATABASE_URL`: pre-authenticated URL to a MySQL-compatible database (e.g. [PlanetScale](https://planetscale.com/))
* `AWS_BUCKET`: name of a S3 Bucket for storing data snapshots
* `AWS_ACCESS_KEY_ID`: AWS IAM access key ID. Needs to have `read` and `write` permission to your S3 bucket.
* `AWS_ACCESS_KEY_SECRET`: AWS IAM access key secret.