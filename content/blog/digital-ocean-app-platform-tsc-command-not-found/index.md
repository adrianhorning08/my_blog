---
title: Digital Ocean App Platform tsc command not found
date: 2021-01-04
tags: ["software-development", "digital-ocean", "typescript"]
---

When trying to deploy my node app on Digital Ocean's App Platform, the build failed and the error was:

```
tsc: command not found
```

Here is what my build command was

```json
"build": "tsc"
```

Apparently I needed to install the dev dependencies, so using

```json
"build": "npm install --only=dev && tsc"
```

worked

Here are some community posts discussing this:

https://www.digitalocean.com/community/questions/app-platform-keeps-using-cached-node_modules-despite-changes

https://www.digitalocean.com/community/questions/how-do-you-use-node-js-devdependencies-in-the-app-platform-builds
