export function validateFormData(formData, type) {
  const { email, password, confirmPassword, firstname, lastname } = formData;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (type === "register") {
    if (!firstname.trim()) {
      return "First Name is required";
    }
    if (!lastname.trim()) {
      return "Last Name is required";
    }
  }

  if (!email.length) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Email is not valid";
  }
  if (!password.length) {
    return "Password is required";
  }
  if (!passwordRegex.test(password)) {
    return "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter";
  }

  if (type === "register") {
    if (!confirmPassword.length) {
      return "Confirm Password is required";
    }
    if (confirmPassword !== password) {
      return "Password and Confirm Password must be the same";
    }
  }

  // If all validations pass, return null or undefined
  return null;
}
