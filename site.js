'use strict';
(function(){
  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Older browser.
    return;
  }
  document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded');

  }); // DOM loaded
})();
