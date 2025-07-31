import path from "path";
import fs from "fs";

export const uploadImage = async (image: File): Promise<string | null> => {
  if (!image || image.size === 0) return null;

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `${Date.now()}-${image.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
};
