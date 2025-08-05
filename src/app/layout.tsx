import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f3f0ec] text-[#333] flex flex-col min-h-screen">
        <header className="h-14 w-full border-b border-[#ddd] flex items-center px-4">
          <GlobalNav />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="h-12 w-full border-t border-[#ddd] flex items-center justify-center px-4 text-sm text-[#666]">
          <GlobalFooter />
        </footer>
      </body>
    </html>
  );
}
