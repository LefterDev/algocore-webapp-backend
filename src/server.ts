import * as dotenv from "dotenv";
dotenv.config();
import express,  { Express, Request, Response } from "express";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.listen(process.env.PORT as string, () => console.log(`Server listening to: http://localhost:${process.env.PORT as string}`))