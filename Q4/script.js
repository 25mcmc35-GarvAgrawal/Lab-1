const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const DOB = document.getElementById("DOB");
const phoneNumber = document.getElementById("phoneNumber");
const strengthBar = document.getElementById("strengthBar");

const validateName = () => {
  const regrex = /^[A-Za-z ]+$/;
  const value = username.value.trim();

  if (value === "") {
    document.getElementById("nameError").innerText = "Field cannot be empty";
    return false;
  }

  if (!regrex.test(value)) {
    document.getElementById("nameError").innerText =
      "Name must contain only alphabets";
    return false;
  }

  document.getElementById("nameError").innerText = "";
  return true;
};

const validateEmail = () => {
  const regrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = email.value.trim();

  if (value === "") {
    document.getElementById("emailError").innerText = "Field cannot be empty";
    return false;
  }

  if (!regrex.test(value)) {
    document.getElementById("emailError").innerText = "Invalid email format";
    return false;
  }

  document.getElementById("emailError").innerText = "";
  return true;
};

const validatePassword = () => {
  const pwd = password.value;
  let score = 0;

  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const percentage = Math.min(score * 20, 100);
  strengthBar.style.width = percentage + "%";

  strengthBar.style.background =
    percentage < 40 ? "red" : percentage < 80 ? "orange" : "green";

  if (score < 5) {
    document.getElementById("passError").innerText = "Password must be strong";
    return false;
  }

  document.getElementById("passError").innerText = "";

  return true;
};

const validateDOB = () => {
  const dob = new Date(DOB.value);
  const today = new Date();

  if (!DOB.value) {
    document.getElementById("dobError").innerText = "Please select DOB";
    return false;
  }

  const age = today.getFullYear() - dob.getFullYear();

  if (age < 18) {
    document.getElementById("dobError").innerText = "You must be 18 year old";

    return false;
  }

  document.getElementById("dobError").innerText = "";

  return true;
};

const validatePhoneNumber = () => {
  const regex = /^[0-9]{10}$/;
  if (!regex.test(phoneNumber.value)) {
    document.getElementById("phoneError").innerText =
      "Phone number must be exactly 10 digits";
    return false;
  }
  document.getElementById("phoneError").innerText = "";
  return true;
};

username.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
DOB.addEventListener("change", validateDOB);
phoneNumber.addEventListener("input", validatePhoneNumber);

document.getElementById("Registration").addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    validateEmail() &&
    validateName() &&
    validatePassword() &&
    validateDOB() &&
    validatePhoneNumber()
  ) {
    alert("Registration SuccessFull");
  } else {
    alert("Please fix the error");
  }
});
