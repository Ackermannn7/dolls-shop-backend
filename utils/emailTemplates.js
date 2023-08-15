const resetPassword = (email, token) => {
  const emailTemplate = {
    from: "dollsForAllStore@gmail.com",
    to: email,
    subject: "Password reset for " + email,
    text:
      "Password Reset Link: " +
      "localhost:4444/customers/" +
      "resetPassword/" +
      token,
  };
  return emailTemplate;
};

export { resetPassword };
