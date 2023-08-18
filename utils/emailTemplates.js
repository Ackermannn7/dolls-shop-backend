const forgotPasswordMsg = (email, token) => {
  const emailTemplate = {
    from: "dollsForAllStore@gmail.com",
    to: email,
    subject: "Password reset for " + email,
    text:
      "Password Reset Link: " +
      // "http://localhost:3000/" +
      "https://dolls-for-all.onrender.com/" +
      "resetPassword/" +
      token,
  };
  return emailTemplate;
};

export default forgotPasswordMsg;
