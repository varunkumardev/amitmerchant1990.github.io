---
layout: post
title: Update state of component from other components using React hooks
image: /cdn/update-state-of-hook-from-other-components-in-react.png
categories: [React]
---

React Hooks are a great way to add stateful logic into function components. So, if you want to maintain a state in the component you can do it using [useState](https://reactjs.org/docs/hooks-state.html) hook like so.

```js
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

As you can tell, the `useState` hook returns two values: the current state (i.e. the `count` variable) and a function that updates it (i.e. `setCount`).

Now, the `setCount` can only be used to update the state within the `Example` component only but there might be some scenarios where you might want to update the state from other components as well.

For instance, in one of the projects I'm working on, I needed to control the modal popup's open-close state from another component.

Here's how the modal component looks like.

```js
import React, { useState } from 'react';
import FormComponent from './FormComponent';

function ModalPopup() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setCount(!open)}>
                Open popup
            </button>
            
            {open && 
                <div>
                    <FormComponent/>
                </div>
            }
        </>
    );
}
```

Now, if you can see, I'm rendering a `FormComponent` inside the popup which holds the form input manipulation operations.

I wanted to close the popup on the successful form submission in the `FormComponent`. How can I toggle the `open` state from within `<ForFormComponentm>`?

To do so, all **I needed to do is to pass in the `setOpen` function as a [prop](https://reactjs.org/docs/components-and-props.html) to the `FormComponent`** like so.

```js
{open && 
    <div>
        <Form
            setOpen={setOpen}
        />
    </div>
}
```

Once done, the `setOpen` is now accessible from within the `FormComponent`. So, if I want to close the popup on the form submission, I can do it like so.

```js
export default function FormComponent({
    setOpen
}) {
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // To close the popup in <ModalPopup/>
        setOpen(false);
    }

    return (
        <>
            {/* code commented for brevity */}
        </>
    );
}
```

This way, you can control the function component's state outside of the component itself!