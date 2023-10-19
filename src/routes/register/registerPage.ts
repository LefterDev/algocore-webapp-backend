import { Request, Response } from "express";
import { registerRouter } from "./router";

registerRouter.get("/", (req: Request, res: Response) => {
    res.send("Register page");
})