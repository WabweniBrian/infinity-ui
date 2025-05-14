import {
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  subject: string;
  message: string;
  senderName?: string;
  email: string;
  category: string;
}

export const ContactEmail = ({
  subject,
  message,
  senderName = "User",
  email,
  category,
}: ContactEmailProps) => {
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
      <Preview>New contact email from {senderName}</Preview>
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

          <Text className="mt-2 text-left text-lg">
            From {senderName} - {email}
          </Text>

          <Text className="mt-2 text-left text-lg">Category {category}</Text>

          <Section className="my-6 rounded-lg bg-white p-4 text-left">
            {message.split("\n").map((paragraph, index) => (
              <Text key={index} className="mb-4 text-gray-800">
                {paragraph}
              </Text>
            ))}
          </Section>

          <Hr className="my-6 border-t border-t-slate-300" />

          <Text className="text-left text-sm text-slate-600">
            This is a contact email, please respond with urgency.
          </Text>

          <Text className="mt-4 text-sm text-slate-600">
            ©{new Date().getFullYear()} Infinty UI
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};
