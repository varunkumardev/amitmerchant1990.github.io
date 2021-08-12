window.addEventListener('keydown', function (event) {
    // Navigates to search 
    // page on pressing "/"
    if (event.code === 'Slash') {
        window.location.href = '/search';
    }

    if (event.ctrlKey && event.code === 'KeyK') {
        event.preventDefault();
        window.location.href = '/keyboard-shortcuts';
    }

    if (event.shiftKey && event.code === 'KeyC') {
        window.location.href = '/categories';
    }
}, false);

// vibrate the device when tapping on the hamburger menu
let menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', function () {
    window.navigator.vibrate(50);
});

const codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  let copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'Copy';

  codeBlock.append(copyButton);

  copyButton.addEventListener('click', function () {
    let code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerText = 'Copied';
    let twoSeconds = 2000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
    }, twoSeconds);
  });
});