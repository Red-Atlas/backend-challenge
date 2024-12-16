import "reflect-metadata";
import app from './app';
import { AppDataSource } from './db';
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