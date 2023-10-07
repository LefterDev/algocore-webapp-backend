import { Request, Response } from "express";
import { registerRouter } from "./router";
import { sign } from "jsonwebtoken";

registerRouter.post("/start-here", async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const personalDetails = {first_name: firstName, last_name: lastName}
    const jwtToken = sign({
        data: personalDetails,
        exp: Math.floor(Date.now() / 1000) + (60 * 20)
    }, process.env.JWT_SECRET as string)
    res.redirect(302, "./create-user?" + encodeURI(jwtToken))
})