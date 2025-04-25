"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { GeneralEmail } from "@/emails/general-email";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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
 * Send a general email to multiple users
 */
export async function sendBulkEmail({
  userIds,
  subject,
  message,
  buttonText,
  buttonUrl,
}: {
  userIds: string[];
  subject: string;
  message: string;
  buttonText?: string;
  buttonUrl?: string;
}) {
  try {
    // Get users from database
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!users.length) {
      throw new Error("No valid recipients found");
    }

    // Send emails to each user
    const results = await Promise.all(
      users.map(async (user) => {
        try {
          // Render the email HTML using the template
          const emailHtml = await render(
            GeneralEmail({
              subject,
              message,
              recipientName: user.name,
              buttonText: buttonText || "Contact Us",
              buttonUrl: buttonUrl || "https://infinityui.vercel.app/support",
            }),
          );

          // Configure mail options
          const mailOptions = {
            from: `"Infinity UI" <${process.env.NODE_MAILER_EMAIL}>`,
            to: user.email,
            subject: subject,
            html: emailHtml,
          };

          // Send the email
          await transporter.sendMail(mailOptions);

          console.log(`Email sent successfully to ${user.email}`);
          return { success: true, userId: user.id, email: user.email };
        } catch (error) {
          console.error(`Error sending email to ${user.email}:`, error);
          return { success: false, userId: user.id, email: user.email, error };
        }
      }),
    );

    // Count successful and failed emails
    const successful = results.filter((r) => r.success).length;
    const failed = results.length - successful;

    // Create notification records for each user
    if (successful > 0) {
      await prisma.notification.createMany({
        data: results
          .filter((r) => r.success)
          .map((r) => ({
            userId: r.userId,
            title: "New Email",
            message: `You have received a new email: ${subject}`,
            type: "info",
            isAdmin: false,
          })),
      });
    }

    // Revalidate any paths that might display email status
    revalidatePath("/admin");

    return {
      success: true,
      message: `Sent ${successful} email${successful !== 1 ? "s" : ""}${failed > 0 ? `, ${failed} failed` : ""}`,
      results,
    };
  } catch (error: any) {
    console.error("Error sending bulk emails:", error);
    return {
      success: false,
      message: error.message || "Failed to send emails",
    };
  }
}
