/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import {
  Img,
  Button,
  Html,
  Container,
  Head,
  Font,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";

export const PasswordResetEmail = ({ url }: { url: string }) => {
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
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#FF3A44",
              },
            },
          },
        }}
      >
        <Container
          className="rounded-lg bg-gray-100 p-4 text-center shadow flex-center-center"
          style={{
            border: "1px solid #ccc",
          }}
        >
          <Text className="my-2 text-2xl font-bold">Password Reset</Text>
          <Img
            src="https://wabtech-admin.vercel.app/logo.png"
            alt="Test"
            height="80"
            width="80"
            className="mx-auto"
          />
          <Text className="mt-2 text-left text-lg">
            Click the following button to reset your password
          </Text>
          <Button
            href={url}
            className="mx-auto w-max rounded-full bg-brand px-6 py-3 font-medium leading-4 text-white"
          >
            Click me
          </Button>
          <Text className="mt-4 text-left text-lg">
            If the above didn't work, copy and paste this link into your web
            browser address bar to reset your password
          </Text>
          <Link href={url} className="mt-2 text-base text-brand underline">
            {url}
          </Link>
          <Text className="mt-4 border-t border-t-slate-500 pt-3 text-sm text-slate-600">
            Copyright ©{new Date().getFullYear()} Auth
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
};
