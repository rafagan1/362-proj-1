'use strict';
(function(){
  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser. Say buh-bye
    console.log('Old browser');
    return;
  }

  document.addEventListener('DOMContentLoaded', function(){
    // console.log('OMG the DOM is loaded!!!1!');
    var phone_number = 0;
    var valid_email = false;
    var valid_phone = false;
    var valid_name = false;
    var tel_input = document.querySelector('#telephone');
    var name_input = document.querySelector('#name');
    var email_input = document.querySelector('#email');
    var signup = document.querySelector('#signup');
    var conf = document.querySelector('#alert .confirm');

    // Clear input values
    tel_input.value = "";
    name_input.value = "";
    email_input.value = "";

    // Disable the signup button until the input fields are validated
    signup.setAttribute('disabled', 'disabled');

    // Attach id to part of document that message will be written.
    // Also hide this part of document until form is submitted.
    conf.innerHTML += '<b id="display"></b>';
    conf.hidden = true;

    // Name input =====================================
    name_input.addEventListener('input', function(){
      valid_name = validate_name(this.value, 'name');
      validate_all();
    });

    // EMAIL input=========================
    email_input.addEventListener('input', function(){
      valid_email = validate_email(this.value);
      validate_all();
    });

    // TELEPHONE input ================================
    tel_input.addEventListener('input', function(){
      valid_phone = validate_us_phone(this.value);
      validate_all();
    });

    function validate_name(name_str) {
      var clean_item = name_str.trim();
      if (clean_item.length >= 1) {
        return(validate(clean_item, /^[A-Za-z,.-\s]+$/));
      }
      return(false);
    }

    function validate_all() {
      var dplay = document.getElementById('display');
      if (valid_phone === true && valid_email === true)
      {
        if (name_input.value.length < 1 || valid_name === false) {
          dplay.innerText = "Must enter a name (Ex. John H. Doe)";
          conf.hidden = false;
        } else {
          conf.hidden = true;
          signup.removeAttribute('disabled');
          return;
        }
      }
      else if (phone_number.length > 10) {
        dplay.innerText = "Maximum of 10 digits for phone number";
        conf.hidden = false;
        return;
      }
      signup.setAttribute('disabled', 'disabled');
      return;
    }

    // Sign up =================
    signup.addEventListener('focus', function() {
      var dplay = document.getElementById('display');
      dplay.innerText = "Thank you for signing up!!";
      conf.hidden = false;
    });

    // FUNCTIONS FROM CLASS DEMO

    // Library of comparison functions
    //
    // Unlike the raw operators these encapsulate, functions
    // can be passed around like any other value into other
    // functions.

    function eq(value, condition) {
      return value === condition;
    }

    // function gt(value, condition) {
    //  return value > condition;
    // }
    // function gte(value, condition) {
    //  return value >= condition;
    // }
    // function lt(value, condition) {
    //  return value < condition;
    // }
    // function lte(value, condition) {
    //  return value <= condition;
    // }

    // Data cleanup functions
    function clean_nonnumbers(value) {
      // returns value with all non-digits removed
      return value.replace(/\D/g, '');
    }
    function clean_whitespace(value) {
      // returns value with all whitespace characters removed
      return value.replace(/\s/g, '');
    }

    // Phone-specific santizier functions
    function strip_us_country_code(value) {
      return value.replace(/^1/, '');
    }

    // All purpose validate function. It takes a value,
    // along with either a regular expression pattern or
    // a simple function -- like the comparison functions
    // above -- and a condition. JavaScript doesn't char
    // if a function is called with more or fewer arguments
    // than described in the function definition, so it's
    // no problem at all to leave off the `condition`
    // argument when calling a check that's a regular expression
    function validate(value, check, condition) {
      if (eq(typeof(check.test), 'function')) {
        // Handle a regular expression
        return check.test(value);
      } else if (eq(typeof(check), 'function')) {
        // Handle a comparison function
        return check(value, condition);
      } else {
        return false;
      }
    }
    // Phone validity functions
    function validate_us_phone(value) {
      phone_number = strip_us_country_code(clean_nonnumbers(value));
      return validate(phone_number.length, eq, 10);
    }
    // Email validity function
    function validate_email(value) {
      var email = clean_whitespace(value);
      return validate(email, /^[^@\s]+@[^@\s]+$/g);
    }
    // END FUNCTIONS FROM CLASS DEMO
  }); // DOM
}());
