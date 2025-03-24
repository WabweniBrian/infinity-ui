import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { InvoiceEmail } from "@/emails/invoice-email";
import type { PaymentStatus } from "@prisma/client";

type UserPurchase = {
  id: string;
  isComponent: boolean;
  status: PaymentStatus;
  isBundle: boolean;
  isPack: boolean;
  amount: number;
  date: Date;
  address: string | null;
  phone: string | null;
  zipCode: string | null;
  orderNumber: string | null;
  component: {
    name: string;
  } | null;
};

type User = {
  name: string | null;
  email: string | null;
};

/**
 * Sends an invoice email to a user after a successful payment
 *
 * @param purchase - The purchase data
 * @param user - The user data (name and email)
 * @returns Promise that resolves when the email is sent
 */
export const sendInvoiceEmail = async (
  purchase: UserPurchase,
  user: User,
): Promise<boolean> => {
  try {
    if (!user.email) {
      console.error("Cannot send invoice: User email is missing");
      return false;
    }

    // Create email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
      },
    });

    // Render email
    const emailHtml = await render(InvoiceEmail({ purchase, user }));

    // Send email
    const info = await transporter.sendMail({
      from: `"Infinity UI" <${process.env.NODE_MAILER_EMAIL}>`,
      to: user.email,
      subject: `Your Invoice from Infinity UI - #${purchase.orderNumber || purchase.id.slice(0, 8)}`,
      html: emailHtml,
    });

    console.log("Invoice email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending invoice email:", error);
    return false;
  }
};
