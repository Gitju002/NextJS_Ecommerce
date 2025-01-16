import Layout from "@/components/layout";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased" suppressHydrationWarning={true}>
        <Layout>
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  );
}
