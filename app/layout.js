import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export const metadata = {
  title: {
    default: "ScreenScape — a guide to what's worth watching",
    template: "%s — ScreenScape",
  },
  description:
    "Browse, search and get recommended television shows, powered by the TVmaze catalogue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-ink font-body text-paper antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
