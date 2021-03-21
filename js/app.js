window.addEventListener('keypress', function (e) {
    // Navigates to search 
    // page on pressing "/"
    if (e.keyCode == '/'.charCodeAt(0)) {
        window.location.href = '/search';
    }
}, false);

// vibrate the device when tapping on the hamburger menu
let menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', function () {
    window.navigator.vibrate(50);
});