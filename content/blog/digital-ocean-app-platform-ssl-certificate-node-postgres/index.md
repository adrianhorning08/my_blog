---
title: Digital Ocean App Platform SSL Certificate Node Postgres
date: 2021-01-02
tags: ["software-development", "node", "digital-ocean", "postgresql"]
---

This goes out to some poor soul who is Googling these terms to try and figure out how the heck to use a SSL certificate.

I was (and probably still am) that poor soul trying to figure it out.

This was extremely frustrating for me, so hoping to save someone some time/pain.

So if you get this error

```
Error: self signed certificate in certificate chain
```

This is what you need to do:

First you need to set an environment variable in the app platform.

Go to the Components tab and specify a `CA_CERT` environment variable and set it to `${name-of-your-service.CA_CERT}`

Here is the DO doc talking about environment variables:

https://www.digitalocean.com/docs/app-platform/how-to/use-environment-variables/

Then you need to reference that when you instantiate the DB connection.

I'm using `node-postgres` https://www.npmjs.com/package/pg

```ts
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: true,
    ca:
      process.env.NODE_ENV === PRODUCTION
        ? process.env.CA_CERT
        : fs.readFileSync("ca_cert.crt").toString(),
  },
})
```

Note that I am not using the `connectionString` parameter. For some reason that doesn't work.

I posted a question here, hopefully it gets answered:
https://github.com/brianc/node-postgres/issues/2009

Also note that I am separating how I reference the certificate on prod vs dev

```ts
  process.env.NODE_ENV === PRODUCTION
    ? process.env.CA_CERT
    : fs.readFileSync("ca_cert.crt").toString(),
```

I have no idea if that is best practice, but locally, you can't stick the cert in an env variable, so, that's the best I could come up with.

To get that cert, you need to download the CA certificate from the DO managed database.

When you go to your managed database, there is a button below the connection details.

![download_cert](../../assets/download_cert.png)

You have to open the cert with a code editor, I used VS Code.

Then just copy the contents and create a new file in your repo, paste the contents, then reference it like I did above.

Here are some community posts:
https://www.digitalocean.com/community/questions/connecting-from-node-js-to-mysql-managed-database

https://www.digitalocean.com/community/questions/can-t-connect-to-managed-database-self_signed_cert_in_chain-error

https://www.digitalocean.com/community/questions/can-t-connect-via-nodejs-error-self-signed-certificate-in-certificate-chain

https://www.digitalocean.com/community/questions/where-should-i-put-a-certificate-crt-file

Hope that helps.
