import Layout from "@/components/layout";
import StoreProvider from "@/store/storeProvider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased" suppressHydrationWarning>
        <Layout>
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  );
}
