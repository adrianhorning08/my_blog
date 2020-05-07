---
title: Starting to Learn Java
date: 2020-05-06
---

I am a frontend developer who is trying to learn Java.

Here are some initial things that I've learned about Java.

## Everything is a Class
In JavaScript, to print `Hello world!`, all you need to do is

```js
console.log('Hello world!')
```

But in Java, EVERYTHING needs to be in a class.

```java
class Main {
  public static void main(String[] args) {
    System.out.println("Hello world!");
  }
}
```

I'm starting to understand what people mean by JavaScript is a more functional language, and Java is Object Oriented.

Functional meaning that everything is a function.

```js
function sayHi() { // create the function
    console.log('hi!')
}
sayHi() // invoke the function
```

Whereas in Java, all functions, or methods, are inside of a class.

```java
class Main { // create the class
  public static void main(String[] args) { // create the method
    System.out.println("Hello world!");
  }
}
```
## Everything needs to have a type
There are 6 primitive data types in JavaScript:
* Boolean
* BigInt
* Undefined
* Number
* String
* Symbol

Everything else is of type `Object` or `Function`

But JavaScript doesn't care what type's your variables are.

`showButton` can be boolean, or function, or whatever you want
```js
let showButton = false
showButton = () => false
```

Which is kind of nice, but also kind of annoying if you're trying to interpret, or use someone elses code.

Java requires you to tell it what type each variable is, AND what the return value of a method will be.
```java
String name = "Adrian";

public static String sayHi(String name)
{
    return "Hi there " + name + "!"
}
```
So before each variable is declared, you have the type in front of it. In this case `sayHi` will return a `String` and the `name` parameter passed in also needs to be of type `String`

There are 8 primitive types in Java:
* byte - Stores a tiny number, ie `10`
* short - Stores a number, smaller than an int, ie `1000`
* int - Stores a number. Only whole numbers allowed, ie `200000`
* long - Stores big numbers, ie `2000000000`
* float - Stores fractional number, ie `10.2`
* double - Stores fractional number, but with more decimal places than a float, ie `10.24232323`
* boolean - `true` or `false`
* char - Stores a single character. Only use single quotes, ie `a`

Every other type will be some sort of Class.

Honestly you probably won't use primitive types a lot. You'll probably be mostly be working with Classes, which are always capitalized. You'll probably be using the `String` class a lot. If you do have to store a whole number, I just use `int`. Maybe Java devs will vehemently disagree but 🤷‍♂️

There's a ton more I could go into regarding types, but I think I'll save that for another blog post. Suffice it to say though, everything needs a type.

## Complied at Build instead of Runtime
I never understood what people meant when they said that JavaScript was compiled at runtime. Now, I still don't 100% get what that means, but I think I understand it 90% 😅

In JavaScript, if I don't define a variable, that code won't break until its run, like on the browser for example, when your user is using it...😬

```js
function sayHi() {
    return `Hi ${name}`
}
```

So there's no way for JavaScript to yell at you before this code gets run that there is an error. Unless you use a linter. 

But in Java, if you make a change to your code, you literally have to press a button to build the code so Java knows it's there, and in the process, will catch these kinds of errors.

## Conventions
Just like in JavaScript, Java uses curly braces `{}` around `if` statements and methods.

But the stylistic convention is different.

In Java, if the `if` statement is only one line, it is convention to omit the curly braces:
```java
if (price == 10)
    return true
```
If it takes up more than one line, then include the curly braces, but put them on a new line:
```java
if (price == 10)
{
    // do stuff to the price
    return price;
}
else
{
    // do other cool things
}
```

Same thing with methods:
```java
public static String sayHi(String name)
{
    return "Hi there " + name + "!"
}
```

I know if looks gross, but it is what it is. 

## Syntax
Although a lot of the syntax is pretty similar, there are a few gotchas to watch out for.

`===` and `!==` do not exist in Java. It is `==` and `!=` in Java.

However, I've found that if you want to evaluate if something is or is not equal, you're probably going to want to use a method.

In JavaScript, semi-colon's are optional, but in Java they are required.

In JavaScript, strings can be in double or single quotes, but in Java `String`s need to be in double quotes `String name = "Adrian";`, and `char`s need to be in single quotes `char letterA = 'a';`

If you try and do `String name = 'Adrian';` Java will get mad.

## Unlearn what you have learned about storing data
![yoda](../../assets/yoda.gif)

### Objects
Thinking about how to store key value pairs is much different in Java.

You could use a HashMap, or DynaBean (sort of similar to JavaScript object), but you could also create a class.

A `HashMap` is a pain if you have keys and values that are of different types, because you have to declare the types of the keys and values when you create the HashMap. For example, if you do:
```java
Map<String, String> person = new HashMap<String, String>();
```
Then each key and value must be Strings! So you couldn't add age, unless you added age as a String.

A DynaBean, however, doesn't care what the types are.

```java
DynaBean person = new DynaBean();
dynaBean.set("name", "Adrian");            
dynaBean.set("age", 30);

dynaBean.get("name"); // returns Adrian
```

Important to note, you have to use the `set` method to set the value of a key, and a `get` method to get the value. You can't just key into it like in JavaScript.

If you wanted to create a person object, you might be better off creating a class.

```java
public class Person
{
  // fields
  private String name;
  private int age;

  // constructor
  public Person(String theName, int age)
  {
    this.name = theName;
    this.age = age;
  }

  // getter and setter
  public String getName()
  {
     return this.name;
  }
  public void setName(String name)
  {
     this.name = name;
  }
}

Person adrian = new Person("Adrian", 30);
adrian.getName(); // returns Adrian
adrian.setName("New Adrian"); 
adrian.getName(); // returns New Adrian
```

## Arrays

The equivalent of an array in JavaScript is the `ArrayList`.

```java
ArrayList<String> movies = new ArrayList<String>();

movies.add("Star Wars"); // [Star Wars]
movies.size() // returns 1 (equivalent to JavaScript .length)
```

There are other Array-like classes like `List`, `Arrays`, `Collection`.

You probably don't want to use `Arrays` because they are initialized to a fixed size.

I believe you can use `List` and `Collection`, but they are Interfaces as opposed to Classes, so they might not have the methods you need, or tons of methods you don't need 🤷‍♂️ I'm still learning myself 😅

I'll have a blog post in the future about the difference between Classes and Interfaces.

## There are JavaScript-type methods in Java8!
Java 8 introduced some functional programing concepts that might make your life a lot easier.

There are methods like `.forEach`, `.map`, and `.filter` that JavaScript programmers will be familiar with.

I wrote about it here: [Looping in Java](https://www.adrianhorning.com/looping-in-java-from-a-javascript-perspective/)


## Conclusion
There are obviously a lot more things, but I think these are good to start with. This will hopefully give you enough to contribute and/or limit the curse words you will use when trying to debug your newly written Java code.

Each of these sections could be their own post, and I'll probably make them their own post in the future.