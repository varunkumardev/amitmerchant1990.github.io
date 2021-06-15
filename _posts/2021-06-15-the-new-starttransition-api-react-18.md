---
layout: post
title: The new startTransition API to offset expensive renders in React 18
image: /cdn/the-new-starttransition-api-react-18.png
categories: [React]
fluidbox: true
---

The latest major version of [React.js](https://reactjs.org/), 18, is around the corner and it will include out-of-the-box improvements (like [automatic batching](https://github.com/reactwg/react-18/discussions/21)), new APIs (like [startTransition](https://github.com/reactwg/react-18/discussions/41)), and a [new streaming server renderer](https://github.com/reactwg/react-18/discussions/37) with built-in support for `React.lazy`.

Among these features, I'm particularly curious about the new `startTransition` API that will be introduced in React 18 and we will be taking a look at it in this article.

* TOC
{:toc}

## The problem

While working with user interfaces, when you perform a certain action, a resulting action would get performed as a side-effect.

For instance, take an example of a blog website where you have a search page with an input to enter a search term. When you enter a search term, it would try to fetch the blog posts from a JSON file, let's say `posts.json`, which has a list of all the posts and render the matching posts accordingly. 

So, here, we can divide this entire process into two updates:

- **The urgent update**
- **The "not so" urgent update**

Let's take a closer look at what does this means.

- **The urgent update** - In React.js, when you are working with input fields, you would typically bind its value with the state when you interact with it like so.

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.state = { search: 'Hello World' };
  }

  setInputValue = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.setInputValue}
        />
        <p>{this.state.value}</p>
      </div>
    );
  }
}
```

This is called an urgent update because users expect this update to be immediate. After all, the native browser handling for such kinds of interactions is fast. So, you can't really do much in this case.

Now, let's take a look at *not so* urgent update which is where the `startTransition` API will come into the picture.

- **The "not so" urgent update** - When the user type in the input, the app can use this value in the search through the blog posts and would render the matching one accordingly. Let's say, this will get triggered by the following function.

```jsx
// Update the input value and search results
setSearchQuery(search);
```

Here, this kind of update is less urgent because users don't expect it to complete immediately. And because these updates can cause large screen updates, it can cause lag on the page while everything renders, making typing or other interactions feel slow and unresponsive.

So, how can one minimize this kind of behavior? This is where React 18's `startTransition` API would be useful.

## The `startTransition` API

The way this new `startTransition` API work is by offloading the less urgent updates to the background so that it doesn't come in the way of urgent updates.

In other words, solves this issue by giving you the ability to mark updates as “transitions” like so.

```jsx
import { startTransition } from 'react';

// Urgent: Show what was typed
setInputValue(search);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(search);
});
```

Updates wrapped in `startTransition` are handled as non-urgent and will be interrupted if more urgent updates like clicks or keypresses come in. If a transition gets interrupted by the user (for example, by typing multiple characters in a row), React will throw out the stale rendering work that wasn’t finished and render only the latest update.

Transitions lets you keep most interactions snappy even if they lead to significant UI changes. They also let you avoid wasting time rendering content that's no longer relevant.

## The `useTransition` hook

While you can directly use the `startTransition` API but if you want to leverage its full advantage, you can use the `useTransition` hook which will come packed with React 18.

The hook not only returns the `startTransition` API but an `isPending` flag which you can use to inform the user that there is work happening in the background like so.

```jsx
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();
```

The `isPending` value is true while the transition is pending, allowing you to show an inline spinner while the user waits.

```jsx
{isPending && <Spinner />}
```

The state update that you wrap in a transition doesn't have to originate in the same component. For example, a spinner inside the search input can reflect the progress of re-rendering the search results.

## In closing

The `useTransition` API looks very useful and solves a particular set of problems, and combined with [React.Suspense](https://reactjs.org/docs/react-api.html#reactsuspense), it will be even more powerful, in my opinion. Exciting time ahead!

If you want to learn more about the `startTransition` API, you check out [this discussion](https://github.com/reactwg/react-18/discussions/41) for the same.
