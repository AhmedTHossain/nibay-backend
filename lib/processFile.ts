import fs from "fs/promises";
import path from "path";

export async function processFile(
  file: File,
  uploadDirectory: string
): Promise<string> {
  const uploadPath = path.join(process.cwd(), uploadDirectory);

  await fs.mkdir(uploadPath, { recursive: true });

  const filePath = `${Date.now()}-${file.name}`;
  const buffer = await file.arrayBuffer();

  await fs.writeFile(path.join(uploadPath, filePath), Buffer.from(buffer));
  return filePath;
}
