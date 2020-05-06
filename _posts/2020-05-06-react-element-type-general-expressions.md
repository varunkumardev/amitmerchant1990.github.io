---
layout: post
title: Select React element type using general expressions
categories: React
image: /cdn/react-element-type-expression.png
---

The usual way of using a React element is to first import it and then utilize it inside of an another React component like so.

```jsx
import React from 'react';
import { PhotoStory } from './stories';

function Story(props) {
  return <PhotoStory story={props.story} />;
}
```

So, in this case, we've imported `PhotoStory` type and used it in `Story` component as shown above.

Now, there might be a situation where you would want to decide the element type based on some condition. Let's say it would be based on props. So for instance, take this.

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  return <components[props.storyType] story={props.story} />; // ❌
}
```

In the above example, we would like React to choose the element type based on the `components` that we've specified. But, you couldn't use computed property/general expression to indicate the type of the element.

Instead, to make it work, you'd need to first assign it to a capitalized variable and use that variable as the element type. So, the above example would get changed to the following.

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />; // ✔️
}
```

And that's how you can use the general expressions as React element type!