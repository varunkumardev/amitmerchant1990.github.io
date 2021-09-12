---
layout: post
title: Graceful error handling using Error Boundaries in React.js
image: /cdn/graceful-error-handling-using-error-boundaries-in-react.png
categories: [React]
---

Working with [React.js](https://reactjs.org/), it's a common thing you would see where if something goes wrong, (for instance, a JavaScript error), the entire React.js app would crash and renders blank.

* TOC*
{:toc}

Meaning, the UI goes entirely blank leaving the error only in the console. This can confuse or even baffles the regular user as to what happened exactly?

Behind the scenes, when any JavaScript error occurs while rendering the component, the entire React component tree would get unmounted and that's why it results in a blank screen.

For instance, take the following for example.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="jOwwbmo" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/jOwwbmo">
  </a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

As you can tell, when not handled properly, when the counter reaches 5 and it throws the error, the screen would go blank without any warning/error on the UI itself.

And this is where React.js's error boundaries can come to the rescue.

## What are Error Boundaries?

In a nutshell, Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods...

- [static getDerivedStateFromError()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror) - This method can be used to render a fallback UI after an error has been thrown.
- [componentDidCatch()](https://reactjs.org/docs/react-component.html#componentdidcatch) - This method can be used to log error information to JavaScript error reporting services, for example.

## How to use them?

Here's how an error boundary component would look like.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Once the component is defined, you can use it to gracefully handle errors for other components by wrapping it like so.

```jsx
<ErrorBoundary>
    <Counter />
</ErrorBoundary>
```

## A practical example

If we want to gracefully handle the errors for our previous example, we can do it using an error boundary like so.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="powwjLo" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/powwjLo">
  React component with error boundries</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

As you can tell, now when you hit count 5, the error doesn't leave the entire UI blank. Instead, it shows a whole lot of information about of error that just occurred. 

And the best thing about this is, you can style this behavior however you want. For instance, you probably want to style it according to your brand's design language.

Also notice, the error boundary will receive the error information in form of `this.state.error` and `this.state.errorInfo` where `this.state.errorInfo.componentStack` holds the entire error stack trace.

## Limitations

Error boundaries, however, are not a one-stop solution. They come with certain limitations. Some of which are as follows.

- Only class components can be error boundaries. This means you can not create an error boundary the functional component way.
- An error boundary can’t catch an error within itself. Meaning, if an error boundary fails to try to render the error message, the error will propagate to the closest error boundary above it.
- Error boundaries can only catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. Error boundaries do not catch errors for [event handlers](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers), Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks), or in server-side rendering.