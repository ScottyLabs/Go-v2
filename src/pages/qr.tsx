"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

export default function Qr() {
  const params = useSearchParams();

  const code = params?.get("code");

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    QRCode.toDataURL(code).then((image) => setImage(image));
  }, [code]);

  if (!image) {
    return null;
  }

  return <Image alt="qr" width={256} height={256} src={image} />;
}
