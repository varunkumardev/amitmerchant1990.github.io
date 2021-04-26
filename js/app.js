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