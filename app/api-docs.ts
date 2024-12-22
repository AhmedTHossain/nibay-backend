import { NextApiRequest, NextApiResponse } from "next";
import swaggerSpec from "../swagger-config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(swaggerSpec);
}