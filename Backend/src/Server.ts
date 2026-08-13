import dotenv from "dotenv";

dotenv.config();

import { app } from "./App.js";
import { connectDb } from "./Db/db.js";
import { initAdmin } from "./Utils/seedAdmin.js";
import { redis } from "./Services/Redis/redis.service.js";

// const PORT: number = Number(process.env.PORT) || 3000;
const PORT = Number(process.env.PORT ?? "3000");

if (Number.isNaN(PORT)) {
  throw new Error("Invalid PORT value in .env");
}

const startServer = async () => {
  try {
    await connectDb();
    await initAdmin();
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running on port ${PORT}`);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Failed to start server:", err.message);
    } else {
      console.error("❌ Failed to start server due to an unknown error.");
    }

    process.exit(1);
  }
};

startServer();

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({
    redis: reply,
  });
});
