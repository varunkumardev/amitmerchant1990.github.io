---
layout: post
title: Handling time intervals in JavaScript
---

# Problem

While working on an [Electron](electron.atom.io) app [Pomolectron](https://github.com/amitmerchant1990/pomolectron), I needed to handle different time intervals through [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) function of JavaScript. 
I basically needed to implement three timers in my app: 

 - Pomodoro of 25 minutes
 - Short break of 5 minutes
 - Long break of 10 minutes

I could think of two ways to implement countdown timer for all three cases. One, to implement different timers by using three different `setInterval()`. Second, finding another way to utilize the same `setInterval()` for all three timers.

# Solution

So, I've tried my hands on the second approach. I can use the same `setInterval()` for all three timers by assigning it to a variable like below,

```javascript
var pomodoroIntervalId;

function startTimer(duration, display) {
  timer = duration;
  pomodoroIntervalId = setInterval(function(){
    if (--timer < 0) {
        timer = duration;
    }
    
    minutes = parseInt(timer/60, 10);
    seconds = parseInt(timer%60, 10);

    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    display.textContent = minutes+ ":" + seconds;

    if(minutes == 0 && seconds == 0){
      notifyUser();
    }
  }, 1000);
}
```

And then utilize the same `startTimer()` across other timers by first clearing the current time interval using [clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) method passing the interval ID. In our case I've assigned it to a global variable `pomodoroIntervalId`. This basically clears the currently running time interval, so that it can be utilized next time another timer has been set. The code would look like below...

```javascript
function resetTimer() {
  clearInterval(pomodoroIntervalId);
}
```

This gives us the benefit of using the same `setInterval()` function across fidderent use cases which makes the code clean and sleek. And I think it's a really handy feature of JavasScript.
