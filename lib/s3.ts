import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.YANDEX_BUCKET_NAME!;

export async function uploadFile(
  file: File,
  folder = ""
): Promise<{ key: string; url: string }> {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split(".").pop();
  const key = folder
    ? `${folder}/${timestamp}-${randomString}.${extension}`
    : `${timestamp}-${randomString}.${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  });

  await s3Client.send(command);

  const url = `https://${BUCKET_NAME}.storage.yandexcloud.net/${key}`;

  return { key, url };
}

export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export async function getFileUrl(key: string): Promise<string> {
  return `https://${BUCKET_NAME}.storage.yandexcloud.net/${key}`;
}
