import { CreateRouteDialog } from "components/CreateRouteDialog";
import { EditRouteDialog } from "components/EditRouteDialog";
import { Toaster } from "components/ui/toaster";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import { QrDialog } from "components/QrDialog";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <QrDialog />
        <CreateRouteDialog />
        <EditRouteDialog />
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default trpc.withTRPC(MyApp);
