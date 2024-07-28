import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
