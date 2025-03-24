import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";

export const thicccboi = localFont({
  src: [
    {
      path: "../public/fonts/THICCCBOI-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/THICCCBOI-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/THICCCBOI-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/THICCCBOI-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/THICCCBOI-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/THICCCBOI-Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-thicccboi",
});

export const firaCode = Fira_Code({
  subsets: ["latin", "cyrillic"],
  variable: "--font-firaCode",
});
