import { Admin } from "../Models/Admin.model.js";

const initAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_FULL_NAME;

    if (!adminEmail || !adminPassword) {
      console.warn("⚠️ Admin credentials not set in .env file");
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

      console.log(`✅ Default admin created: ${adminEmail}`);
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save(); // pre("save") hashes it

      console.log(`🔄 Admin password updated.`);
    } 
  } catch (error) {
    console.error("❌ Error initializing admin:", error);
  }
};

export { initAdmin };
