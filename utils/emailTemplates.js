const forgotPasswordMsg = (email, token) => {
  const emailTemplate = {
    from: "dollsForAllStore@gmail.com",
    to: email,
    subject: "Password reset for " + email,
    text:
      "Password Reset Link: " +
      // "http://localhost:3000/" +
      "https://dolls-shop.vercel.app/" +
      "resetPassword/" +
      token,
  };
  return emailTemplate;
};

export default forgotPasswordMsg;
