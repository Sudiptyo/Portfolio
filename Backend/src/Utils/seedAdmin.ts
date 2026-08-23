import { Admin } from "../Models/Admin.model.js";
import { logger } from "./logger.js";

const initAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_FULL_NAME;

    if (!adminEmail || !adminPassword) {
      logger.warn("Admin credentials not set in .env file");
      return;
    }

    const existingAdmin = await Admin.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (!existingAdmin) {
      await Admin.create({
        fullName: adminName || "System Admin",
        email: adminEmail.toLowerCase(),
        password: adminPassword,
      });

      logger.info("Default admin created");
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save(); // pre("save") hashes it

      logger.info("Admin password updated.");
    }
  } catch (err) {
    logger.error({ err: err }, "Failed to initialize admin");
  }
};

export { initAdmin };
