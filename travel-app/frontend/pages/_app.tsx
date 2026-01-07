import type { AppProps } from "next/app";
import { useEffect } from "react";
import { loadToken } from "../lib/auth";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadToken();
  }, []);

  return <Component {...pageProps} />;
}
