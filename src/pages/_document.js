import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="static/img/favicon.png" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-Y7M37QYJZ5`}
          />
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API}&libraries=places`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `  window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', 'G-Y7M37QYJZ5');`,
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
