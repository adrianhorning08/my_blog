---
title: What I Learned Switching From MongoDB to MySQL
date: 2018-09-18
---

I was building a simple application in Node/Express.js and MySQL because I have only used MongoDB with Node and I wanted to learn how to use it with MySQL.

I was trying to just implement Facebook OAuth with Passport.

I tried reusing code from a previous project I built with Node/MongoDB. It was pretty similar, except for a few small things in my passport.js file. However, those small things cost me hours of time trying to figure out.

### Errors
The errors I was getting were: `Failed to serialize user into session and Passport Node(Error: Failed to deserialize user out of session.)`

After hours of troubleshooting, turns out I was just not understanding:

1. Difference in Promises vs Callbacks
2. What argument the error is in a Promise vs a Callback
3. What is returned from a MySQL query

### Subtle difference between Promises and Callbacks
```js
// Mongoose
passport.deserializeUser((id, done) => {  
  User.findById(id)
   .then(user => { 
     done(null, user);
   })
   .catch(err => {
     console.log(err);
   })
});
// MySQL 
passport.deserializeUser((id, done) => {
  db.query(`SELECT * FROM users WHERE id = ${id};`, (err, rows) => {
  done(null, rows[0]);
  })
});
```
Mongoose (very handy ORM for MongoDB) uses Promises, MySQL just uses callbacks.

### Arguments that the Error and Results are in
The thing that killed me was that the first argument in the .then is the result that you want, not the error.

But in callbacks, the first argument is the error, and the second argument is the result.

So when I copied over the code, I was returning the error (which was null), when I wanted to return the result of the query.

### Return Value of Raw MySQL Query
An ORM like Mongoose is awesome because a query like User.findById(1) will just give you that record.

Whereas a raw SQL query will return an array of rows that the query found. It will ALWAYS return an array, even if you just find 1 result.

So if you just wanted to query to find a User, you would have to return the 0th element (just like what was done in the code block above).