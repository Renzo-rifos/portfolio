import { type AppType } from "next/dist/shared/lib/utils";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";
import { clashGrotesk } from "../lib/fonts";
import "../styles/globals.css";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <div
      className={`${clashGrotesk.variable} ${dmSans.variable} font-sans antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
