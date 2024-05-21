import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ATL Flavors | Admin",
  description: "ATL Flavor Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <AppProvider>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
