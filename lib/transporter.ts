import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_EMAIL_ID,
    pass: process.env.NEXT_EMAIL_PASS,
  },
});

// Optional: Verify connection configuration on startup
transporter.verify(function (error) {
  if (error) {
    console.error("Error with mail transporter:", error);
  } else {
    console.log("Mail transporter is ready");
  }
});
