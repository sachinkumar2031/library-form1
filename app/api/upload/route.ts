import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});
export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, "-")}`;

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return Response.json({
    url: signedUrl,
    key,
  });
}
