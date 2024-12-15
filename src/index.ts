import "reflect-metadata";
import app from './app.js';
import { AppDataSource } from './db.js';
import http from 'http';

export async function main() {
  try {
    const httpServer = http.createServer(app);
    await AppDataSource.initialize();
    console.log("database connected")
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: process.env.PORT }, resolve);
    });
  } catch (error) {
    console.error(error)
  }
}

main();