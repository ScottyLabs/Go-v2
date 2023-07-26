import { CreateRouteDialog } from "components/CreateRouteDialog";
import { EditRouteDialog } from "components/EditRouteDialog";
import { Toaster } from "components/ui/toaster";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <CreateRouteDialog />
      <EditRouteDialog />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
