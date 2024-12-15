import "reflect-metadata";
import app from './app.js';
import { AppDataSource } from './db.js';

export async function main() {
  try {
    await AppDataSource.initialize();
    console.log("database connected")
    app.listen(process.env.PORT);
    console.log("Server is listening on port 3000");
  } catch (error) {
    console.error(error)
  }
}

main();