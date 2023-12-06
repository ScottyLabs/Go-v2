import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import useDialogStore from "stores/DialogStore";
import useQrStore from "stores/QrStore";
import { useRouter } from "next/router";
import env from "../env/client.mjs";

export function QrDialog() {
  const { dialog, setDialog } = useDialogStore();
  const { route } = useQrStore();
  const router = useRouter();

  if (!route) return null;

  return (
    <Dialog
      open={dialog === "qr" && !!route}
      onOpenChange={(open) => setDialog(open ? "qr" : null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to access the route.{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${env.NEXT_PUBLIC_URL}/qr?code=${encodeURIComponent(
                    route.location,
                  )}`,
                );
              }}
            >
              Copy Link
            </span>
          </DialogDescription>
        </DialogHeader>
        <QRCode className="w-full" value={route.location} />
      </DialogContent>
    </Dialog>
  );
}
