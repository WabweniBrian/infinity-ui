import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { EmailVerification } from "@/emails/email-verification";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
  },
});

const url =
  process.env.NODE_ENV === "production"
    ? "https://bare-auth.vercel.app"
    : "http://localhost:3000";

export const sendEmailVerification = async (email: string) => {
  const link = `${url}/verify-email?email=${email}`;
  const emailHtml = await render(EmailVerification({ url: link }));

  const mailOptions = {
    from: "wabtech.tech@gmail.com",
    to: email,
    subject: "Email Verification",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification link sent successfully");
  } catch (error) {
    console.error("Error sending verification link:", error);
    throw error;
  }
};
