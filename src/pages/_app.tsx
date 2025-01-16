import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/store/storeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <main>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </StoreProvider>
  );
}
