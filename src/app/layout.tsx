import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Catverse",
    default: "Catverse",
  },
  description:
    "Join the ultimate feline-friendly community! Share cat photos, connect with fellow cat lovers, and explore a world of whiskers and purrs. Your purrfect social media experience awaits!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
