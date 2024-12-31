import type { Metadata } from "next";
import "./globals.css";
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import "./styles/layout.css"; //header, footer
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';

export const metadata: Metadata = {
  title: "KOMJI BLOG",
  description: "Komji's dev blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
