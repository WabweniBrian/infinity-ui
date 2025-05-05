import BackToTopButton from "@/components/common/back-button";
import KoFiWidget from "@/components/common/kofi-widget";
import { SchemaMarkup } from "@/components/common/schema-markup";
import { ThemeProvider } from "@/components/common/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { dmSans, plusJakarta } from "./font";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#11ACBB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://infinityui.vercel.app"),
  title: "📌 Infinity UI - Beautiful UI That Converts More",
  description:
    "🚀 Infinity UI offers modern, high-converting UI components designed for seamless user experiences. Build faster, enhance engagement, and boost conversions with stunning, accessible design",
  keywords: [
    "infinity ui",
    "infinityui",
    "react ui blocks",
    "next.js ui blocks",
    "react ui components",
    "next.js components",
    "react components",
    "react ui components blocks",
    "next.js ui components",
    "saas ui components",
    "next.js ui components blocks",
    "tailwind css components",
    "shadcn web blocks",
    "shadcn ui blocks",
    "shadcn ui components",
    "typescript web development",
    "responsive web design",
    "ui kit for next.js",
    "web block elements",
    "navbars",
    "hero sections",
    "CTAs",
    "features",
    "section",
    "dashboard pages",
    "components",
    "forms",
    "beautifully designed ui",
    "infinity ui",
  ],
  authors: [{ name: "Infinity UI Team" }],
  creator: "Infinity UI",
  publisher: "Infinity UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://infinityui.vercel.app",
    siteName: "Infinity UI",
    title: "Infinity UI - Beautifully Designed React/Next.js UI Blocks",
    description:
      "Elevate your SaaS startup with Infinity UI! Beautifully Designed React/Next.js UI Blocks",
    images: [
      {
        url: "https://infinityui.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infinity UI - Beautifully Designed React/Next.js UI Blocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@infinity-ui",
    creator: "@infinity-ui",
    title: "Infinity UI - Beautifully Designed React/Next.js UI Blocks",
    description:
      "Elevate your SaaS startup with Infinity UI! Beautifully Designed React/Next.js UI Blocks",
    images: ["https://infinityui.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${dmSans.variable} ${plusJakarta.variable}`}
      >
        <SchemaMarkup
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Infinity UI",
            url: "https://infinityui.vercel.app",
            logo: "https://infinityui.vercel.app/logo.png",
            sameAs: [
              "https://www.facebook.com/infinity-ui",
              "https://www.twitter.com/infinity-ui",
              "https://www.instagram.com/infinity-ui",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+256-775-894-639",
              contactType: "customer service",
            },
          }}
        />
        <NextTopLoader color={"#F6A71A"} zIndex={9999} />
        <Toaster
          toastOptions={{
            className:
              "bg-white dark:bg-slate-800 dark:text-slate-200 z-[999999]",
            duration: 3000,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="infinityui-theme"
        >
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <BackToTopButton />

          {/* <div className="fixed bottom-10 right-2 z-[999]">
            <ThemeSwicher />
          </div> */}
        </ThemeProvider>

        {/* Ko-fi Widget - Client Component */}
        <KoFiWidget username="brianwabweni" />
      </body>
    </html>
  );
};

export default RootLayout;
