---
layout: post
title: How to install Deno on Ubuntu (Linux)
image: /cdn/install-deno-ubuntu.png
categories: [Deno]
---

Deno, the successor of Node.js, is now stable with it's [v1.0 release](https://deno.land/v1). 

[Deno](https://deno.land/) is a simple, modern, and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust. Here are some of its highlighting features.

- Secure by default. No file, network, or environment access (unless explicitly enabled).
- Supports TypeScript out of the box.
- Ships a single executable (`deno`).
- It has built-in utilities like a dependency inspector (`deno info`) and a code formatter (`deno fmt`).
- It has [a set of reviewed (audited) standard modules](https://github.com/denoland/deno/tree/master/std) that are guaranteed to work with Deno.
- Scripts can be bundled into a single javascript file.

Looking at all these features, it was pretty tempting for me to try it out, and now that it's stable, why not? Let's jump into it.

## Installing Deno on Ubuntu 18.04

I'm using Ubuntu 18.04 as my primary OS and I have got [Homebrew](https://brew.sh/) installed on it. So, I've tried installing Deno using it first using Homebrew...

```bash
$ brew install deno 
```

But unfortunately, I ended up with the following error which is [an existing issue](https://github.com/denoland/deno_install/issues/93) with Homebrew itself.

```
deno: macOS is required.
Error: An unsatisfied requirement failed this build.
```

So, I had to switch to another way which was using curl. I ran the following commands.

```bash
$ cd ~
$ curl -fsSL https://deno.land/x/install/install.sh | sh
```

And that has successfully installed Deno...

![Deno successful installation](/images/deno-installation.png)

But there was still some work left. The issue was if I try to get info using command `deno --version`, nothing came. It was because, I haven't specified Deno's install path into the terminal's `.bashrc` (or `.bash_profile` in some other Linux flavors).

So, I added following lines into `.bashrc` (which was there in the `home` in my case),

```
export DENO_INSTALL="/home/amitmerchant/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

I saved it, restarted the terminal, and ran `deno --version` and boom... it has started working like a charm!

![Deno version](/images/deno-version.png)