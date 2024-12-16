import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";

import mainRouter from "./routes/index.routes";
import errorHandler from "./middlewares/errorHandler.mid";

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());

// ROUTES

app.use("/", mainRouter);

// HANDLERS

app.use(errorHandler);

export default app;
