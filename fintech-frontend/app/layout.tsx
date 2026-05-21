import "./globals.css";

import QueryProvider
  from "@/providers/QueryProvider";

import Navbar
  from "@/components/layout/Navbar";

import { Toaster }
  from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <QueryProvider>
          <Navbar />

          <main
            className="
              max-w-7xl
              mx-auto
              p-6
            "
          >
            {children}
          </main>

          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}