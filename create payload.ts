import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk, XummTypes } from "xumm-sdk";
import Image from "next/image";

const xummSdk = new XummSdk(
  process.env.XUMM_API_KEY,
  process.env.XUMM_API_SECRET
);

type XummPayload = {
  meta: {
    uuid: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newPayload: XummTypes.CreatePayload = {
    txjson: { TransactionType: "SignIn" },
    options: { pathfinding_fallback: false, force_network: "N/A" },
  };
  const created: XummTypes.XummPostPayloadResponse =
    await xummSdk.payload.create(newPayload);
  const payload: XummPayload = await xummSdk.payload.get(created);
  return res.status(200).json(payload);
}
