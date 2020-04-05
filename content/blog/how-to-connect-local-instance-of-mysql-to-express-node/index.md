---
title: How To Connect Local Instance of MySQL to Express/Node
date: 2018-09-14
description: ""
---

New programmer here just relating some things I learned as I tried to hook up a MySQL DB with Express/Node backend.

This took me at least 6 hours. I kept getting a bunch of errors. I wanted to write this to share how I eventually got it up and running, hopefully saving someone else many hours of frustration.

## Setup
I already had node. I needed to:

1. Download MySQL
2. Download MySQL Workbench

Running on macos

## Problem

Followed this tutorial for hooking up a MySQL database to Express: https://www.youtube.com/watch?v=HPIjjFGYSJ4

But when I booted up the Express server nodemon server.js I got this error:
`{“code”:”PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR”,”fatal”:false}`

With the help of some handy console.log’s, I figured out that I wasn’t even connecting to the MySQL server. Here is where the error was in my express server:
```js
connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});
```

I forget exactly the error I got here, but I believe it was telling me that authentication failed. Something like: 
`ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)`

This video was helpful https://www.youtube.com/watch?v=5GeVMDQsDpc

But the command:

`update user set authentication_String = PASSWORD(“newpass”) where user=’root’;`

Gave me an SQL syntax error. I think maybe because the versions were off.

Thankfully the documentation actually came in clutch. Instead of that command I did:

`mysql> FLUSH PRIVILEGES;`

Then

`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';`

Per: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html

And then then it worked!