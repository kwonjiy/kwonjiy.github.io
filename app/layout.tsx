import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/layout.css"; //header, footer

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOMJI BLOG",
  description: "Komji's dev blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KOMJI BLOG</title>
        <meta name="google-site-verification" content="8xs4LZZDWOl6cvt67id6j6sN5RJb705-FkxwJsX9RNU" />
        <meta name="google-adsense-account" content="ca-pub-1844696790697351" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RV1RSNE7TB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RV1RSNE7TB');
            `,
          }}
        />
      </head>
      <body>
        <header>
          <div id="header">
            <h1>@KOMJI BLOG</h1>
            <p>어제 뭐했는지 기억못하는 청년의 기억소</p>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="footer-icons">
            <a href="/feed.xml" aria-label="RSS Feed">
              <i className="fas fa-rss"></i>
            </a>
            <a href="https://github.com/kwonjiy" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <p>2024 Kwonjiy's Blog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
