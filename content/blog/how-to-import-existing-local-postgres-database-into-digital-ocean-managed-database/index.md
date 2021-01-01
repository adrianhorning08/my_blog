---
title: How to import existing local Postgres database into Digital Ocean Managed Database
date: 2021-01-03
tags: ["software-development", "digital-ocean", "postgresql"]
---

If you have a database on your local machine that has a bunch of data, here is how you can import it into a Digital Ocean Managed Database.

Go to your terminal

Be in the directory you want the sql dump file to be placed

Run

```
pg_dump --no-owner --format=c local_db_name > whatever-name-you-want.sql
```

Then go to your DO managed database.

You're going to want the `Connection string`, which you get by clicking the dropdown in the upper right, it probably says `Connection parameters`.

Copy that.

Then go to your terminal and run

```
pg_restore -n public -d "connection_string_goes_here" --jobs 4 /Users/adrianhorning/Documents/whatever-name-you-want.sql
```

Obviously replacing `/Users/adrianhorning/Documents` with wherever your sql file is located.

Good luck.
