import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ProviderWrapper } from "@/provider/ProviderWrapper";
import DefaultLayout from "@/components/layout/DefaultLayout";

export const metadata: Metadata = {
  title: "HotSolToken",
  description: "HotSolToken",
  icons: "/image/header-logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <ProviderWrapper>
            <DefaultLayout>
              {children}
            </DefaultLayout>
          </ProviderWrapper>
      </body>
    </html>
  );
}
