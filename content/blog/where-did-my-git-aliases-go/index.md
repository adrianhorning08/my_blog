---
title: Where did my git aliases go?
tags: ["git"]
date: 2020-05-10
---

On my machine I have the following git aliases (or is it aliai? 🤔)

```
alias ga="git add -A"
alias gc="git commit -m"
alias gs="git status"
alias gp="git push origin master"
```

But recently, when I did `ga`, I got `zsh: command not found`

🤦‍♂️ ah, duh.

I forgot that after I upgraded to Catalina, `zsh` is now the default shell instead of `bash`.

Didn't realize that would wipe out all my aliases 🤷‍♂️, but I guess that's cool. Good thing I didn't have a ton in my `bash_profile` 😬

To set up aliases in zsh, [this article](https://medium.com/fbdevclagos/using-zsh-aliases-for-better-terminal-experience-6f16f261ad52) was extremely helpful.

I believe all I did was:

* `vi ~/.zshrc`
* Added the aliases
* Press `:wq` to exit

And then you have to open a new terminal window, or somehow reload the terminal (forget if thats a thing you can do. I know you can do something like that in Ruby 🤷‍♂️).

And then you should be set! 👍