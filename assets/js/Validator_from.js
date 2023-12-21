Validator({
  form: '#form_login',
  formGroupSelector: '.auth-form__form',
  errorSelector: '.error-message',
  rules: [
    // Validator.isRequired('#fullname', 'Vui lồng nhập tên dầy đủ của bạn'),
    Validator.isRequired('#phone'),
    // Validator.isEmaill('#email'),
    Validator.minLength('#password', 8),
    // Validator.isRequired('#re-password'),
    // Validator.isRequired('input[name="gender"]'),
    // Validator.isConfirmed('#re-password', function () {
    //   return document.querySelector('#form-1 #password').value;
    // }, 'Mật khẩu nhập lại không chính ')
  ],
  onSubmit: function (data) {

    //Call API
    console.log(data);

  }
});


// Hàm
function Validator(options) {


  function getParent(element, selector) {

    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }

      element = element.parentElement;
    }

  }


  var selectorRules = {};
  // Hàm thực hện validate
  function validate(inputElement, rule) {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
    var errorMessage;
    // ấy ra các rule của selector
    var rules = selectorRules[rule.selector];
    // Lặp qua từng rule và kiểm tra
    // Nếu có lỗi thi dừng kiểm tra
    for (var i = 0; i < rules.length; ++i) {

      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](

            formElement.querySelector(rule.selector + ':checked')

          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }

      if (errorMessage) {
        break;
      }
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add('invalid');
    } else {
      errorMessage.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
    }
    return !errorMessage;
  }

  // Lấy element form cần validate
  var formElement = document.getElementById(options.form);
  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var isFormValid = true;
      // Thự hiện lặp qua tưng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector)
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        //Trường hợp submit với javaScrip
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name] : not([disable])')
          var formValues = Array.from(enableInputs).reduce(function (values, input) {

            switch (input.type) {
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'radio':
                values[input.name] = formElement.querySelector('input[name"]' + input.name + '"]:checked').value;
                break;
              case 'file':
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          }, {});
          options.onSubmit(formValues);
        }
        // Trường hợp submit với hành vi mặc định
        else {
          formElement.submit();
        }
      }
    }

    // Xly lặp qua mỗi rule  và xly (lắng nghje sự kiện blur và input,.... )
    options.rules.forEach(function (rule) {
      //Lưu  lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = rule.test;
      }
      var inputElements = formElement.querySelectorAll(rule.selector)

      Array.form(inputElements).forEach(function (inputElement) {
        // Khi focus vào xong ra ngoài bắt sự kiện đó
        // Xử lý trường hợp blur ra ngài input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xử lý mỗi khi người dùng nập vào input
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message')
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        };
      });
    });
  };
};


// Định nghi các rules
// Nguyên tắc của các rules :
// 1. Khi có lỗi => rà ra message lỗi
// 2. Khi không hợp lệ => trả ra rỗng (undifined)
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {

      return value ? undefined : message || 'Vui lòng nhập trường này';

    }
  };
}

Validator.isEmaill = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {

      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      return regex.test(value) ? undefined : message || 'Vui lòng nhập email';


    }
  };
}


Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    }
  };
}


Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
    }


  };

}
