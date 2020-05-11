---
title: Optional chaining is here!
date: 2020-05-09
---

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

```js
const elon = {
    name: 'Elon Musk',
    companies: {
        spaceX: {
            founding: 2002
        },
    }
}

elon?.companies?.spaceX?.founding // 2002
elon?.companies?.tesla?.founding // undefined
```

This is huge because if you try to index into something undefined, JavaScript will throw an error and blow up your application.

![atom_bomb](../../assets/atom_bomb.gif)

This was a huge source of bugs for me when I was first developing. Sometimes data I was trying to get to in the response was deeply nested in the JSON, but sometimes that data was missing from certain responses.

This is really neat, but honestly I'll probably still stick to the `get` [lodash function](https://lodash.com/docs/4.17.15#get). It does the same thing as optional chaining, but lets you specify a default value.

Seems like if I am expecting an array, it might be better to return an empty array `[]`, rather than `undefined`.