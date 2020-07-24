---
layout: post
title: How I implemented a Konami easter egg on my blog
image: /cdn/implement-konami-code-easter-egg.png
categories: [JavaScript]
fluidbox: true
---

So, the other day, I was going through my Twitter feed and I saw [this tweet](https://twitter.com/avstorm/status/1280367397279608833?s=20). This user had explored an easter egg on the newly designed [Stripe.com](https://stripe.com/en-us)'s website.

The easter egg is nothing but a sequence of different keypress known as [Konami Code](https://en.wikipedia.org/wiki/Konami_Code) (<kbd>↑</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><kbd>←</kbd><kbd>→</kbd><kbd>B</kbd><kbd>A</kbd>), which when achieved, can invoke this control panel at the bottom of the page.

[![](/images/stripe-konami-code.png)](/images/stripe-konami-code.png)

Using this panel, you can play around with the gradients which are there at the top of the header. Things such as turn off different gradient colors, pause/play the animation, and so on.

> The Konami Code (Japanese: コナミコマンド, Konami komando, "Konami command") is a cheat code that appears in many Konami video games, and some non-Konami games. In the original code, the player can press the sequence of buttons (mentioned previously) on the game controller to enable a cheat or other effects.

I found this so cool and I was tempted to implement something like this on my blog as well.

And it turns out, it's rather really simple to do so. Here's the entire code in vanilla JavaScript which can invoke a cool Confetti upon pressing Konami code sequence.

```js
const keySequence = [];
let konamiString = '';
const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];

document.addEventListener('keyup', function(e) {
    keySequence.push(e.key);
    keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
    konamiString = konamiCode.join('');

    if (keySequence.join('').includes(konamiString)) {
        const confettiConfig = { target: 'confetti-holder' };
        const confetti = new ConfettiGenerator(confettiConfig);
        confetti.render();
    }
});
```

Let's break down the code and understand what's going on.

The variable `keySequence` is used to store the key sequence that the user on the site will press. The `konamiCode` is the variable that holds the actual Konami code as an array, which I'm using to match the key sequence later in the code. The `konamiString` is used to store the string form of the `konamiCode` array later in the code.

Next, I've registered an [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) which will listen to the `keyup` event. Inside the event listener, I'm storing the key sequence by pushing it into the `keySequence` variable through the following line of code.

```js
keySequence.push(e.key);
```

The next line is important. The Konami code consists of only 10 keys. So, we don't want to store more than 10 keys into the `keySequence` as that would be overkill. For this, we're [splicing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) off the array from the reverse to the length of the Konami code with the following code like so.

```js
keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
```

The rest of the code is simple. All we need to do is convert both `keySequence` and `konamiCode` to string and compare both to invoke the easter egg like so.

```js
konamiString = konamiCode.join('');

if (keySequence.join('').includes(konamiString)) {
    // invoke the eater egg of your choice
}
```

In the `if` condition, you can invoke whatever you'd like. I've invoked a cool confetti effect on the page using [this library](https://agezao.github.io/confetti-js/). But you can choose to do invoke a host of other things. Like the one on [Stripe.com](https://stripe.com/en-us). The possibilities are endless!

But before that, try it out on her right now and feel the superpower! 😉

I hope you learned something new here and let me know in the comments what you'd like to do with Konami code your site/blog/web app.

Until next time!
