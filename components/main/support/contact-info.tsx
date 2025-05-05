import { Clock, Mail, Phone } from "lucide-react";
import type React from "react";

export default function ContactInformation() {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm dark:bg-card/30">
      <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>

      <div className="space-y-6">
        <ContactItem
          icon={<Mail className="h-5 w-5 text-primary" />}
          title="Email Us"
          description="For general inquiries:"
          contact="support@infinityui.dev"
          href="mailto:support@infinityui.dev"
        />

        <ContactItem
          icon={<Phone className="h-5 w-5 text-primary" />}
          title="Call Us"
          description="Monday to Friday, 9am-5pm (EAT):"
          contact="+256775894639"
          href="tel:+256775894639"
        />

        <ContactItem
          icon={<Clock className="h-5 w-5 text-primary" />}
          title="Response Time"
          description="We aim to respond to all inquiries within 2-3 business days."
        />
      </div>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contact?: string;
  href?: string;
}

function ContactItem({
  icon,
  title,
  description,
  contact,
  href,
}: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mb-1 text-sm text-muted-foreground">{description}</p>
        {contact && (
          <a href={href} className="text-primary hover:underline">
            {contact}
          </a>
        )}
      </div>
    </div>
  );
}
