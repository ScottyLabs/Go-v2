import { NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from "next/og";
// eslint-disable-next-line no-use-before-define
// @ts-ignore 
import qrcode from "yaqrcode"; // (no types)

export const config = {
    runtime: "edge"
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.url) {
        throw Error("no url")
    }
    const url = new URL(`http://localhost:3000/${req.url}`) // fun fact req.url is not a url
    const code = url.searchParams.get("code")
    if (!code) {
        throw Error("invalid url")
    }
    const image = qrcode(code, { size: 512 })
    return new ImageResponse(
        <img width={512} height={512} src={image} />,
        {
            width: 512,
            height: 512
        }
    )
}