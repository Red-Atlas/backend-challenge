import "reflect-metadata";
import "./utils/envAction.util";

import { PORT } from "./constants";

import app from "./app";
import AppDataSource from "./database/connect";

async function main() {
  try {
    await AppDataSource.initialize();

    app.listen(PORT, () => console.log("server listening on port", PORT));
  } catch (error) {
    console.log("Error during app initializing", error);
  }
}

main();
