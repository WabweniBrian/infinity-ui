import ContactForm from "@/components/main/support/contact-form";
import ContactInformation from "@/components/main/support/contact-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Contact",
  description:
    "Get help with our UI Components. Our support team is ready to assist you with any questions or issues you may have.",
};

export default function SupportPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand/10 dark:bg-cyan-950/20">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            Support & Contact
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have questions or need help with our ui components? We&apos;re here
            to assist you.
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          <div className="space-y-8 md:col-span-1">
            <ContactInformation />
          </div>

          <div className="md:col-span-2">
            <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm dark:bg-card/30 md:p-8">
              <h2 className="mb-6 text-xl font-semibold">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
