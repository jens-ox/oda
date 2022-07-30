# 🦑 Bundesdatenkrake

Extraction, versioning and machine-readable provisioning of public data.

## How it works

* Gather public information by running `pnpm crawl` (this is done every night at 4 by GitHub Actions)
* Compress and hash it
* Check if the current MD5 matches the entry in the database
* If not, create new snapshot in the database and put compressed snapshot into S3 bucket

## API

See the [deployed Swagger docs](https://bundesdatenkrake.vercel.app/swagger).

## Environment variables

* `DATABASE_URL`: pre-authenticated URL to a MySQL-compatible database (e.g. [PlanetScale](https://planetscale.com/))
* `BUCKET`: name of a S3 Bucket for storing data snapshots
* `ACCESS_KEY`: AWS IAM access key ID. Needs to have `read` and `write` permission to your S3 bucket.
* `ACCESS_KEY_SECRET`: AWS IAM access key secret.