import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  await connectDatabase();

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
