const forgotPasswordMsg = (email, token) => {
  const emailTemplate = {
    from: "dollsForAllStore@gmail.com",
    to: email,
    subject: "Password reset for " + email,
    text:
      "Password Reset Link: " +
      "http://localhost:4444/auth/" +
      "resetPassword/" +
      token,
  };
  return emailTemplate;
};

export default forgotPasswordMsg;
