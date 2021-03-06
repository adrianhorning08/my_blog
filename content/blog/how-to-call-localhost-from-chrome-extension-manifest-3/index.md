---
title: How to call localhost from chrome extension manifest 3
date: 2021-03-05
tags: ["software-development"]
---

In Manifest 2, you would put `localhost` in permissions like so

```json
  "permissions": [
    "activeTab",
    "http://localhost:5000/*",
    "storage",
    "identity"
  ],
```

But that has changed in Manifest 3

And by these Manifest's I mean

```json
  "manifest_version": 3,
```

Now, you do this

```json
"content_security_policy": {
  "extension_pages": "script-src http://localhost;  object-src http://localhost;"
}
```

References

- https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/
- https://stackoverflow.com/questions/30212306/no-content-security-policy-meta-tag-found-error-in-my-phonegap-application
- https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/
- https://content-security-policy.com/
