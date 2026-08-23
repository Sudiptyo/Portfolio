import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import fs from "node:fs";
import { logger } from "./logger.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath: string,
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    logger.info(
      {
        publicId: response.public_id,
        resourceType: response.resource_type,
      },
      "File uploaded to Cloudinary",
    );

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    logger.error({ err: error }, "Cloudinary upload failed");

    return null;
  }
};

export { uploadOnCloudinary };
