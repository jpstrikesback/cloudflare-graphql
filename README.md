# CloudFlare + Workers KV + GraphQL
### Because we can.

This is a *very* simple GraphQL API built on top of Cloudflare Workers KV.

You may query and mutate items in a single Workers KV namespace by sending application/graphql format POST requests.

```graphql

query getStuff {
  getStuffById(id: "1") {
    id
    blob
  }
}

mutation putStuff {
  putStuff(id: "3", blob: "this is even more so the updated right stuff") {
    id
    blob
  }
}
```

To get started:

Make sure you have enabled Workers and created a KV Namespace.

Install:

- `yarn` or `npm i`

Add your credentials and config:
- modify serverless.yml to add your domain:

```yaml
provider:
  name: cloudflare
  config:
    accountId: ${env:CLOUDFLARE_ACCOUNT_ID}
    zoneId: ${env:CLOUDFLARE_ZONE_ID}
    namespaceId: ${env:CLOUDFLARE_NAMESPACE_ID}
    workers:
      hello:
        routes:
          - **example.com**/graphql
```
- `export CLOUDFLARE_AUTH_KEY=MY_CF_GLOBAL_API_KEY`
- `export CLOUDFLARE_AUTH_EMAIL=MY_CF_ACCT_EMAIL`
- `export CLOUDFLARE_ACCOUNT_ID=MY_CF_ACT_ID`
- `export CLOUDFLARE_ZONE_ID=A_CF_ZONE_ID`
- `export CLOUDFLARE_NAMESPACE_ID=A_CF_WORKERS_KV_NAMESPACE_ID`

Deploy it!:

`serverless deploy`

You may now launch the editor via the Cloudflare dash and play

#### **Note:** this proof of concept uses a fork of a fork of the cloudflare-serverless-workers project in order to enable serverless-webpack and Workers KV NAMESPACE binding
