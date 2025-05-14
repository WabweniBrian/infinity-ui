import * as React from "react";
import {
  Html,
  Container,
  Head,
  Font,
  Tailwind,
  Text,
  Section,
  Button,
  Img,
  Hr,
  Preview,
} from "@react-email/components";

interface GeneralEmailProps {
  subject: string;
  message: string;
  recipientName?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const GeneralEmail = ({
  subject,
  message,
  recipientName = "User",
  buttonText,
  buttonUrl,
}: GeneralEmailProps) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Questrial"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Questrial&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{subject}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#11ACBB",
              },
            },
          },
        }}
      >
        <Container className="rounded-lg bg-slate-100 p-8 text-center shadow">
          <Img
            src="https://infinityui.wabtech.tech/logo.png"
            alt="Company Logo"
            height="80"
            width="80"
            className="mx-auto mb-4"
          />

          <Text className="my-4 text-2xl font-bold">{subject}</Text>

          <Text className="mt-2 text-left text-lg">Hello {recipientName},</Text>

          <Section className="my-6 rounded-lg bg-white p-6 text-left">
            {message.split("\n").map((paragraph, index) => (
              <Text key={index} className="mb-4 text-gray-800">
                {paragraph}
              </Text>
            ))}
          </Section>

          {buttonText && buttonUrl && (
            <Section className="my-8 text-center">
              <Button
                href={buttonUrl}
                className="rounded-full bg-brand px-6 py-3 font-medium text-white"
              >
                {buttonText}
              </Button>
            </Section>
          )}

          <Hr className="my-6 border-t border-t-slate-300" />

          <Text className="text-left text-sm text-slate-600">
            If you have any questions, please don&apos;t hesitate to contact our
            support team.
          </Text>

          <Text className="mt-4 text-sm text-slate-600">
            ©{new Date().getFullYear()} Infinty UI
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};
