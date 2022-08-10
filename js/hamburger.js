(function() {

  const hamburgerButton = document.getElementsByClassName("hamburger")[0];

  hamburgerButton.onclick = function myFunction() {
    let mobileLinks = document.getElementById('links');
    if (mobileLinks.style.display === 'block') {
      mobileLinks.style.display = 'none';
    } else {
      mobileLinks.style.display = 'block';
    }
  }

})();
