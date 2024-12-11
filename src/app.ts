import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";

import mainRouter from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

// ROUTES

app.use("/", mainRouter);

// HANDLERS

export default app;
