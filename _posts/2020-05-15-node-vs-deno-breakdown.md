---
layout: post
title: Node.js vs Deno — A high-level comparison
image: /cdn/node-vs-deno.png
categories: [Deno]
---

This is a high-level comparison between [Node.js](https://nodejs.org/) and [Deno](https://deno.land/). This article will get updated regularly as Deno is still in its early days, so we might see some differentiating factors in the coming years. But for now, this is how both, Node.js and Deno, stand to each other.

|  Node.js | Deno  |
|---|---|
| v1.0 released on May 27, 2009 | v1.0 released on 13th May, 2020 |
| It's a JavaScript runtime built on Chrome's V8 JavaScript engine  |  It's a secure runtime for JavaScript and TypeScript. |
| Built on top of JavaScript and C++.  | Built on top of TypeScript and Rust.  | 
| Doesn't support TypeScript out of the box.  | Supports TypeScript out of the box.  | 
| Has file, network, or environment access  | Secure by default. No file, network, or environment access, unless explicitly enabled.  | 
| Uses `npm` as its package manager.  | Doesn't use package manager of any sort.  | 
| Uses `require()` to load ES modules using following syntax: `const http = require('http');`  | [Third-party modules](https://deno.land/x) are imported via URLs using following syntax:`import * as log from "https://deno.land/std/log/mod.ts";`  | 
| Third-party modules get installed locally using `npm` | Third-party modules fetched and cached on first execution, and never updated until the code is run with the `--reload` flag.  |
| Uses `package.json` in its module resolution algorithm.  | Doesn't use `package.json` in its module resolution algorithm.  | 
| Doesn't come with in-built testing facility | Comes with in-built tooling like unit testing, code formatting, and linting to improve developer experience. |