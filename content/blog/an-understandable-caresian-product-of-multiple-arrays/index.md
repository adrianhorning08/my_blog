---
title: An understandable Cartesian Product of Multiple arrays
date: 2018-04-20
---

Given a vector of vector of words, print out all combinations of one word from the first vector, one from the second vector, etc. WITHOUT using recursion.

`[[‘cat’, ‘dog’], [‘foo’, ‘bar’, ‘baz’], [‘hello’, ‘world’]`

Apparently this is called Cartesian Product of Multiple Arrays. I found this post on GitHub: [Cartesian product of multiple arrays in JavaScript](https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript). But didn’t find it extremely useful because I couldn’t breakdown the solutions and see what was happening.

Many thanks to [Adrian Jewell](https://www.linkedin.com/in/adrian-jewell/) and [Porfy Matias](https://www.linkedin.com/in/porfiriomatias/) for coming up with this solution.

```js
function printCombos(array) {
  var results = [[]];
    for (var i = 0; i < array.length; i++) {
        var currentSubArray = array[i];
        var temp = [];
        for (var j = 0; j < results.length; j++) {
            for (var k = 0; k < currentSubArray.length; k++) {
                temp.push(results[j].concat(currentSubArray[k]));
            }
        }
        results = temp;
    }
  return results;
}
```
You can run this in your console and check out the debugger, but the crux of it is:

* Loop over the entire array
* Loop over the RESULTS array
* THEN loop over the current elements in the current array, concatenating the current element onto the arrays in the results array
* Set results to temp
* Do it all again

So just like the recursive solution, but it was hard for me to understand how it would work outside of recursion.