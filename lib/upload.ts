import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";

const storage = multer.memoryStorage();
export const uploadFile = multer({ storage });

export function uploadFileMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
