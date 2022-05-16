import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default async function (email, subject, content) {
  try {
    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });
    // Specify the fields in the email.
    let mailOptions = {
      from: "Food Delivery",
      to: email,
      subject: subject,
      html: content,
    };
    await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}
