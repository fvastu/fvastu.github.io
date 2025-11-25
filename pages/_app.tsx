import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import "../styles/global.scss";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div lang="en">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <Component {...pageProps} key={router.route} />
          <Analytics />
        </AnimatePresence>
      </div>
    </>
  );
}

export default MyApp;
