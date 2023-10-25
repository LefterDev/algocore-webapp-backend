import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, Router } from "express";
import { registerRouter } from "./routes/register";
import { loginRoute } from "./routes/userLogin";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import allowedMethods from "./utils/allowedMethods";
import cookieParser from "cookie-parser";
const app: Express = express();
connect(process.env.MONGO_URI as string).then(() =>
  console.log("Database connected successfully")
);
app.use(cookieParser());
app.use(allowedMethods);
app.use(bodyParser.urlencoded({ extended: true }));
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
