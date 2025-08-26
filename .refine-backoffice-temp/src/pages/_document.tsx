import type { DocumentProps } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Refine Backoffice" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}