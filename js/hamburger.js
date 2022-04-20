(function() {

  const screenMinWidth = window.matchMedia("(min-width: 701px)");
  const hamburgerButton = document.getElementsByClassName("hamburger")[0];

  hamburgerButton.onclick = function myFunction() {
    let mobileLinks = document.getElementById('myMobileLinks');
    if (mobileLinks.style.display === 'block') {
      mobileLinks.style.display = 'none';
    } else {
      mobileLinks.style.display = 'block';
    }
  }

  function myFunctionScreen(screenMinWidth) {
    let mobileLinks = document.getElementById('myMobileLinks');
    if (screenMinWidth.matches && mobileLinks.style.display === 'none') {
      mobileLinks.style.display = 'block';
    }
  }

  myFunctionScreen(screenMinWidth);
  screenMinWidth.addListener(myFunctionScreen);

})();
