import "@/styles/globals.scss";
import type App from "next/app";

export default function App({ Component, pageProps }: App) {
  return <Component {...pageProps} />;
}
