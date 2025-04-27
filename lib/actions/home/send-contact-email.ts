"use server";

import { ContactEmail } from "@/emails/contact-email";
import { prisma } from "@/lib/prisma";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
  },
});

/**
 * Send a general email to a user
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  category,
}: {
  email: string;
  name?: string;
  subject: string;
  message: string;
  category: string;
}) {
  try {
    // Render the email HTML using the template
    const emailHtml = await render(
      ContactEmail({
        subject,
        message,
        senderName: name,
        email,
        category,
      }),
    );

    // Configure mail options
    const mailOptions = {
      from: `"Infinity UI" <${process.env.NODE_MAILER_EMAIL}>`,
      to: process.env.NODE_MAILER_EMAIL,
      subject: subject,
      html: emailHtml,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        title: "New Contact Email",
        message: `You have received a new contact email from ${name} - ${email}`,
        type: "info",
        isAdmin: true,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error.message || "Failed to send email",
    };
  }
}
