---
title: Looping in Java From a JavaScript Perspective
date: 2020-04-27
---

My first language was JavaScript and I am trying to learn Java because our backend where I work is written in Java.

In JavaScript, there are a bunch of ways to loop over something. There's a `for` loop, `.map`, `.forEach`, and `.reduce` methods, just to name a few of the most common.

But in Java, there was pretty much only the `for` loop.

That was however, until Java 8 came out in 2014.

Java 8 made Java feel a little more functional, a lot like JavaScript.

Here is what a regular for loop looks like in Java:
```java
// words is basically -> ["java", "javascript", "ruby"]
for (String word : words) {
    System.out.println(word) // the equivalent of console.log in JS
}
```

`for (String word : words)`  
is shorthand for  
`for (int i = 0; i < words.size(); i++ )`

If you wanted to filter something, this is how you would do it before Java 8:
```java
private static List<String> getFilterOutput(List<String> words) {
    List<String> result = new ArrayList<>();
    for (String word : words) {
        if (!"java".equals(word)) {
            result.add(word);
        }
    }
    return result;
}
```

But here is how you can now do it in Java 8:
```java
 public static void main(String[] args) {

    List<String> programmingLanguages = Arrays.asList("java", "javascript", "ruby");

    List<String> result = programmingLanguages.stream() // convert list to stream
            .filter(language -> !"java".equals(language)) 
            .collect(Collectors.toList()); // collect the output and convert streams to a List

    result.forEach(System.out::println); //output: javascript, ruby
}
```

Thanks to https://mkyong.com/java8/java-8-streams-filter-examples/ for his blog on this and which these code examples come from.