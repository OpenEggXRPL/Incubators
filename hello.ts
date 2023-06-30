// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { XummSdk } from "xumm-sdk";
import { ApplicationDetails } from "xumm-sdk/dist/src/types";
import { CuratedAssetsResponse } from "../types/Meta/CuratedAssetsResponse";
export const config = {
  api: {
    externalResolver: true,
  },
};

const xummSdk = new XummSdk(
  process.env.XUMM_API_KEY,
  process.env.XUMM_API_SECRET
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CuratedAssetsResponse>
) {
  const response = await xummSdk.getCuratedAssets();
  res.status(200).json(response);
}
