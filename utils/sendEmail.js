import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "aleksey.rudyksm@gmail.com", // generated ethereal user
    pass: "uurjumlzmhasvluv", // generated ethereal password
  },
});

const sendEmail = (emailTemplate) => {
  transporter.sendMail(emailTemplate, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

export default sendEmail;
