import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Richa Srivastava",
    template: "%s — Richa Srivastava",
  },
  description:
    "Engineering & AI Leader. Writing on enterprise AI, technology leadership, and insurance. Poetry in English and Hindi.",
  openGraph: {
    siteName: "Richa Srivastava",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="site-wrapper">
          <Header />
          <main>{children}</main>
          <footer>
            <p>© {new Date().getFullYear()} Richa Srivastava</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
