import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>KOMJI BLOG</title>
          <meta name="google-site-verification" content="8xs4LZZDWOl6cvt67id6j6sN5RJb705-FkxwJsX9RNU" />
          <meta name="google-adsense-account" content="ca-pub-1844696790697351" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;