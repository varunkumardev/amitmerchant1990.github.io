---
layout: post
title: Avoid relative import paths in React.js using Webpack aliases
image: /cdn/relative-import-paths-in-react-using-webpack-aliases.png
categories: [React]
---

Here's a little tip for your React.js projects that can dramatically improve your developer experience.

So, if you have been working with modern JavaScript lately, [React.js](https://reactjs.org/) or anything similar, you might have used relative paths to import modules like so.

For instance, let's say if I want to import a module that is two directories up from the current file location, I would need to import it like so.

```js
import Order from '../../components/order';
```

Now, it kind of works but if you can notice this kind of imports are not easy to comprehend and you've to keep track of the level of the directory you're currently in which, in my opinion, is not friendly at all.

How do we make this a little straightforward? Well, it turns out if you're using [Webpack](https://webpack.js.org/) as a module bundler for your project, it's rather pretty easy.

## Webapck Aliases

By setting `resolve.aliases` in your Webpack [config](https://webpack.js.org/configuration) (`webpack.config.js`), you can make the process of importing modules pretty easy.

So, if we want to add an alias for the `src/components` from our previous example, we can do it like so.

```js
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      @Components: path.resolve(__dirname, 'src/components/'),
    },
  },
};
```

As you can tell, now we have an alias for the `src/components` directory. Notice, I have prepended `@` to the alias to easily distinguish between an alias import vs. the normal import when we going to import things.

Since the alias is now ready, we can import modules using it like so.

```js
import Order from '@Components/order';
```

Useful, right?
