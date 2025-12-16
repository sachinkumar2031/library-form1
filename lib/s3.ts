import "dotenv/config";
import { DeleteObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import imageCompression from "browser-image-compression";
// Create reusable S3 instance
const s3 = new S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (file: File) => {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1, // You can adjust this based on your limits
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });

  const res = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify({
      fileName: compressedFile.name,
      fileType: compressedFile.type,
    }),
  });

  const { url, key } = await res.json();

  // Upload file to S3 using signed URL
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": compressedFile.type,
    },
    body: compressedFile,
  });

  return {
    file_key: key,
    url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${key}`,
  };
};

export async function uploadPdfToS3(buffer: Buffer, fileName: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: "application/pdf",
    // ACL: "public-read", // If you want to access it via URL directly
  });

  await s3.send(command);

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`;
}

export function getS3Url(file_key: string): string {
  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
}

export async function deleteFromS3(file_key: string): Promise<boolean> {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: file_key,
    };

    await s3.send(new DeleteObjectCommand(params));
    return true;
  } catch (error) {
    console.error("S3 Delete Error:", error);
    return false;
  }
}
