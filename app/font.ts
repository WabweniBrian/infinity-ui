import { Fira_Code, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const firaCode = Fira_Code({
  subsets: ["latin", "cyrillic"],
  variable: "--font-firaCode",
});
