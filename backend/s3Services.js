// s3Service.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({ region: process.env.AWS_REGION });

async function uploadFileToS3(fileBuffer, bucketName, keyName) {
  const params = {
    Bucket: bucketName,
    Key: keyName,
    Body: fileBuffer
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await s3Client.send(command);
    console.log("Upload successful", data);
    return data;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

export { uploadFileToS3 };
