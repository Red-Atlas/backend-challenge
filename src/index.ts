import "reflect-metadata";
import { AppDataSource } from './db.js';

export async function main() {
  try {
    await AppDataSource.initialize();
    console.log("database connected")
  } catch (error) {
    console.error(error)
  }
}

main();