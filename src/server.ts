import * as dotenv from "dotenv";
import "./connect_db";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { loginRoute, registerRouter } from "./routes/router";
const app: Express = express();

app.use("/login", loginRoute);
app.use("/register", registerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT as string, () =>
  console.log(
    `Server listening to: http://localhost:${process.env.PORT as string}`
  )
);
