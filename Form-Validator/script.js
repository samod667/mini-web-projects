const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//SHOW INPUT ERROR MESS
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
  const instructions = document.querySelector('.container2')
  instructions.className = "container2 active"
}

//SHOW INPUT SUCCESS MESS
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//CHECK EMAIL IS VALID
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSuccess(input);
  } else {
      showError(input, 'Not an email')
  }
  
}

//GET FIELD NAME VALIDATOR

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//CHECK REQUIRED FIELDS
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//CHECK INPUT LENGTH

function checkLength(input, min, max){
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less then ${max} characters`)
    } else {
        showSuccess(input)
    }
};

//CHECK PASSWORD
function checkPassword (input) {
    const re = /^(?=.*[\w])(?=.*[A-Z])(?=.*[\W])[\w\W]{8,}$/;
    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Password is not valid')
    };
}

//CHECK PASSWORD MATCHES

function matchPasswords(input1, input2){
     const re = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/;
    checkPassword(input1)
    checkPassword(input2)

    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
};


//EVENT LISTENERS
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15)
  checkEmail(email)
  matchPasswords(password, password2)
  
});
