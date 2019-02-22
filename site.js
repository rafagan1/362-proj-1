'use strict';
(function(){
  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser. Say buh-bye
    console.log('Old browser');
    return;
  }

  function validate_input(in_str, str_type)
  {
    var ret = false;
    switch(str_type) {
    case 'email':
      var email_str = in_str;
      var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email_str.length >= 1 && email_str.match(emailformat)) {
        ret = true;
      }
      break;
    case 'phone':
      var phone_str = in_str;
      var clean_number = phone_str.replace(/\D/g, '');
      // Remove any 1 apppearing at the start of the number
      var sanitized_number = clean_number.replace(/^1/, '');
      // Finally, check to see if the number is 10 digits long
      if (sanitized_number.length === 10) {
        console.log('That number looks great!');
        ret = true;
      }
      break;
    case 'name':
      var name_str = in_str;
      var clean_item = name_str.trim();
      if (clean_item.length >= 1) {
        console.log('Valid name');
        ret = true;
      }
      break;
    default:
      break;
    }
    return(ret);
  }

  // Using class demo as starter
  var submit = document.querySelector('#signup');

  document.addEventListener('DOMContentLoaded', function(){
    var valid_email = false;
    var valid_phone = false;
    var valid_name = false;

    console.log('OMG the DOM is loaded!!!1!');
  //  var heading_text = document.querySelector('#content h1').innerText;
  //  console.log('The heading text is:', heading_text);

    var tel_input = document.querySelector('#telephone');
    var name_input = document.querySelector('#name');
    var email_input = document.querySelector('#email');
    tel_input.value = "";
    name_input.value = "";
    email_input.value = "";
    var name_STR = "";
    var email_STR = "";
    var phone_STR = "";
    var disp = "";
    var meal = "";

    // Disable the submit button until we are reasonable sure
    // that we have a ten-digit phone number
    submit.setAttribute('disabled', 'disabled');

    // Name =====================================
    name_input.addEventListener('keyup', function(){
      console.log('name input is ', this.value);
      valid_name = validate_input(this.value, 'name');
      validate_all();
      console.log('Valid name', valid_name);
    });

    // EMAIL
    email_input.addEventListener('keyup', function(){
      valid_email = validate_input(this.value, 'email');
      validate_all();
    });

    //TELEPHONE ================================
    //  var tel_input = document.querySelector('#telephone');
    tel_input.addEventListener('keyup', function(){
      valid_phone = validate_input(this.value, 'phone');
      validate_all();
    });

    function validate_all() {
      if (valid_name == true &&
        valid_email == true &&
        valid_phone == true) {
        // All input items are valid. Allow forme
        // to be submitted
        submit.removeAttribute('disabled');
      } else {
        // One of the entry is not valid
        submit.setAttribute('disabled', 'disabled');
        }
    }
    var signup = document.querySelector('#signup');
    signup.addEventListener('focus', function() {
      var veg = document.getElementById('veg').checked;
      var pc = document.getElementById('cphone').checked;

      meal = "Non-Vegetarian";
      var contact = "Phone";

      if (veg == true) {
         meal = "Vegatarian";
      }

      if (pc == false) {
        contact = "Email";
      }

      phone_STR = tel_input.value;
      name_STR  = name_input.value;
      email_STR = email_input.value;
      disp = "Information entered: \nName = " + name_STR;
      disp += "\nEmail = " + email_STR;
      disp += "\nPhone = "+ phone_STR;
      disp += "\nMeal Type = "+ meal;
      disp += "\nContact Method = "+ contact;
      // Alert the inputs
      alert(disp);
    });

  }); // DOM
}());
