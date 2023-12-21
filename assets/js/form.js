$(document).ready(function () {
  var modal = $('#modal');
  var click_login = $('#click_login_user');
  var click_reg = $('#click_register_user');
  var modal_sigin = $('#modal_form-sigin');
  var modal_reg = $('#modal_form-login');
  var isButtonClicked = false;

  // Changer From
  $(document).on('click', '#login_user', function (event) {
    event.stopPropagation();
    $('#phone_error, #password_error').text('');
    $('#phone').css("border", "1px solid #ccc");
    $('#password').css("border", "1px solid #ccc");
    modal.show();
    modal_sigin.hide();
  });

  $(document).on('click', '#register_user', function (event) {
    event.stopPropagation();
    modal.show();
    modal_sigin.show();
    modal_reg.hide();
  });

  $(document).on('click', '#next_form_login', function (event) {
    event.stopPropagation();
    modal_sigin.hide();
    modal_reg.show();
  });


  $(document).on('click', '#next_form_reg', function (event) {
    event.stopPropagation();
    modal_reg.hide();
    modal_sigin.show();
  });

  $(document).on('click', '#logout', function (event) {
    event.stopPropagation();
    $('#user_login').hide();
    click_login.show();
    click_reg.show();
  });

  // Back From
  $(document).on('click', '#back', function (event) {
    event.stopPropagation();
    modal_sigin.hide();
    modal_reg.show();
    $('#phone-error, #password-error,#repassword_error,#email-errol,#phone_error,#password_error').text('');
    $('#phone-reg').css("border", "1px solid #ccc");
    $('#email').css("border", "1px solid #ccc");
    $('#password-reg').css("border", "1px solid #ccc");
    $('#re-password').css("border", "1px solid #ccc");
    $('#phone').css("border", "1px solid #ccc");
    $('#password').css("border", "1px solid #ccc");
  });

  $(document).on('click', '#comeback', function (event) {
    event.stopPropagation();
    modal.hide();
  });

  // Xky login and register
  $('#form-register').submit(function (event) {
    event.preventDefault();

    var email = $('#email').val();
    var phone_reg = $('#phone-reg').val();
    var password_reg = $('#password-reg').val();
    var re_password = $('#re-password').val();


    $('#phone-error, #password-error,#repassword_error,#email-errol').text('');
    $('#phone-reg').css("border", "1px solid #ccc");
    $('#email').css("border", "1px solid #ccc");
    $('#password-reg').css("border", "1px solid #ccc");
    $('#re-password').css("border", "1px solid #ccc");

    if (email === '') {
      console.log("ok")
      $('#email-errol').text('Email is required');
      $('#email').css("border", "1px solid red");
    }

    if (phone_reg === '') {
      $('#phone-error').text('Phone is required');
      $('#phone-reg').css("border", "1px solid red");
    }

    if (password_reg === '') {
      $('#password-error').text('Password is required');
      $('#password-reg').css("border", "1px solid red");
    }

    if (re_password === '') {
      $('#repassword_error').text('Re-password is required');
      $('#re-password').css("border", "1px solid red");
    }

    if (password_reg !== re_password) {
      $('#repassword_error').text('Passwords do not match');
      $('#password-reg').css("border", "1px solid red");
      $('#re-password').css("border", "1px solid red");
      return;
    }


    if (phone_reg.trim() != "" && password_reg.trim() != "" && re_password.trim() != "" && email.trim() != '') {

      $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          "id": "",
          "username": "",
          "password": password_reg,
          "phone": phone_reg,
          "email": email
        }),
        success: function (response) {
          // Xử lý phản hồi từ máy chủ proxy nếu cần
          console.log('Success:', response);
        },
        error: function (xhr, status, error) {
          // Xử lý lỗi nếu có
          console.error('Error:', status, error);
        }
      });
    }
  });


  $('#form_login').submit(function (event) {
    event.preventDefault();

    var phone = $('#phone').val();
    var password = $('#password').val();

    $('#phone_error, #password_error').text('');
    $('#phone').css("border", "1px solid #ccc");
    $('#password').css("border", "1px solid #ccc");

    if (phone === '') {
      $('#phone_error').text('Phone or Email is required');
      $('#phone').css("border", "1px solid red");
    }
    if (password === '') {
      $('#password_error').text('Password is required');
      $('#password').css("border", "1px solid red");
    }

    if (phone.trim() !== "" && password.trim() !== "") {
      $.ajax({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/TranHung-98/UpData_Product_EveryOne/main/user.json',
        dataType: 'json',
        success: function (response) {
          var userFound = false;

          for (var i = 0; i < response.length; i++) {
            if (phone === response[i].phone && password === response[i].password) {
              modal.hide();
              $('#click_login_user').hide();
              $('#click_register_user').hide();
              $('#user_login').show();
              userFound = true;
              break;
            } else if (  response[i].phone === phone) {
              $('#password_error').text('Password is not correct');
              $('#password').css("border", "1px solid red");
              userFound = true;
              continue;
            } else if (response[i].password === password) {
              $('#phone_error').text('Phone is not register');
              $('#phone').css("border", "1px solid red");
              userFound = true;
              continue;
            }
          }

          if (!userFound) {
            // Handle case where neither phone nor password matched
            $('#phone_error').text('Invalid credentials');
            $('#phone').css("border", "1px solid red");
            $('#password_error').text('Invalid credentials');
            $('#password').css("border", "1px solid red");
          }
        }
      });
    }
  });

  $(document).on('click', '#user_login', function (e) {
    e.stopPropagation;

    if (isButtonClicked) {
      $('.header__nav-user-menu').hide();
    } else {
      $('.header__nav-user-menu').show();
    }

    isButtonClicked = !isButtonClicked;

  });


  $(document).on('click', '#header-notifi', function (e) {
    e.stopPropagation;

    if (isButtonClicked) {
      $('.header__notifi').hide();
    } else {
      $('.header__notifi').show();
    }

    isButtonClicked = !isButtonClicked;

  });



  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.hide();
      modal_sigin.show();
      modal_reg.show();
      $('#phone-error, #password-error,#repassword_error,#email-errol').text('');
      $('#phone-reg').css("border", "1px solid #ccc");
      $('#email').css("border", "1px solid #ccc");
      $('#password-reg').css("border", "1px solid #ccc");
      $('#re-password').css("border", "1px solid #ccc");
    }

  });

});

