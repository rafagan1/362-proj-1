'use strict';
(function(){
  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser. Say buh-bye
    // console.log('Old browser');
    return;
  }
  // Using class demo as starter
  var submit = document.querySelector('#submit');

  document.addEventListener('DOMContentLoaded', function(){
    // console.log('OMG the DOM is loaded!!!1!');
    // var heading_text = document.querySelector('#content h1').innerText;
    // console.log('The heading text is:', heading_text);
    // Disable the submit button until we are reasonable sure
    // that we have a ten-digit phone number
    submit.setAttribute('disabled', 'disabled');
  });

  // TELEPHONE
  var tel_input = document.querySelector('#telephone');
  tel_input.addEventListener('focus', function(){
    console.log('OMG somebody focused on the telephone input');
  });
  tel_input.addEventListener('blur', function(){
    console.log('OMG somebody navigated away from the telephone input');
  });

  tel_input.addEventListener('keyup', function(){
    // Remove all non-digit characters from the telephone input's value
    var clean_number = this.value.replace(/\D/g, '');
    // Remove any 1 apppearing at the start of the number
    var sanitized_number = clean_number.replace(/^1/, '');
    // Finally, check to see if the number is 10 digits long
    if (sanitized_number.length === 10) {
      console.log('That number looks great!');
      // If so, allow the form to be submitted
      submit.removeAttribute('disabled');
    }
  });

  // Name
  var name_input = document.querySelector('#name');

  // EMAIL
  var email_input = document.querySelector('#email');

  // Home Address
  var street_input = document.querySelector('#street');
  var city_input = document.querySelector('#city');
  var state_input = document.querySelector('#state');
  var zip_input = document.querySelector('#zip');

  // Meal Type
  var veg_input = document.querySelector('#veg');
  var nonVeg_input = document.querySelector('#nonVeg');

  // Contact method
  var cemail_input = document.querySelector('#cemail');
  var cphone_input = document.querySelector('#cphone');
  var cmail_input = document.querySelector('#cmail');
}());
