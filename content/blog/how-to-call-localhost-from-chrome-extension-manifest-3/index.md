---
title: How to call localhost from chrome extension
date: 2021-03-05
tags: ["software-development"]
---

Will go over how to do this in Manifest 2 and 3.

By the way, the [docs](https://developer.chrome.com/docs/extensions/mv3/) actually aren't too bad. I found they were probably more helpful than googling stuff.

## Setting up Manifest file

### Manifest 2

Put `localhost` in permissions like so

```json
  "permissions": [
    "activeTab",
    "http://localhost:5000/*",
    "storage",
    "identity"
  ],
```

And I think you're good to go. Maybe have Content Security Policy in there just in case as well.
I can't remember everything that needs to be in there because I changed a million things trying to get it to work.

```json
"content_security_policy": "script-src 'self'; object-src 'self'; worker-src 'self'",
```

I only had success using `fetch` and chaining `.then`s. I tried async/await, but I don't think that

### Manifest 3

Manifest 3 is their updated version. I honestly can't remember if you need to put `localhost` in `matches` or `host_permissions`. Someone tweet at me if that's wrong. But I'm sure you need `content_security_policy`.

Now, you do this

```json
"content_scripts": [
  {
    "matches": ["http://localhost/*"],
    "all_frames": true,
    "js": ["./content.js"],
    "run_at": "document_end"
  }
],
"host_permissions": ["http://localhost:5000/*"],
"content_security_policy": {
  "extension_pages": "script-src http://localhost;  object-src http://localhost;"
}
```

## Calling the endpoint

I have used `fetch` and that has worked. I don't think you can import anything, so you're stuck with native API's.

Also, I haven't gotten `async/await` to work. Only `.then` chaining has worked for me.

This is in my background script by the way

```js
 // background.js
 /* global chrome */
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

 chrome.runtime.onMessage.addListener((msg, sender, sendResponseToContent) => {
  case "FETCH_USER":
    fetch(`http://localhost:5000/user/${msg?.payload?.userId}`)
      .then((res) => res.json())
      .then(({ user: { id } }) => {
        chrome.storage.local.set({ userId: id });
        sendResponseToContent(SUCCESS);
      })
      .catch((err) => {
        console.log("err", err);
        sendResponseToContent(ERROR);
      });
    break;
    case "CREATE_USER":
      postData("http://localhost:5000/users", {
        email: msg?.payload?.email,
      })
        .then((data) => {
          sendResponseToContent(SUCCESS);
          chrome.storage.local.set({
            userId: data?.userId,
          });
        })
        .catch((err) => {
          sendResponseToContent(ERROR);
          console.log("err", err);
        });
      break;
 })
```

That `postData` function was just copied from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

References

- https://developer.chrome.com/docs/extensions/mv3/xhr/
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/
- https://developer.chrome.com/docs/extensions/mv3/declare_permissions/
- https://stackoverflow.com/questions/30212306/no-content-security-policy-meta-tag-found-error-in-my-phonegap-application
- https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/
- https://csper.io/blog/csp-violates-the-content-security-policy-directive
- https://content-security-policy.com/
- https://www.youtube.com/watch?v=7Tu2j2pc87I
