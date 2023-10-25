import { User } from "../Schemas/UserSchema";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { Router } from "express";
import { Request, Response } from "express";
export const loginRoute: Router = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  let queue: Record<string, any> = {};
  if (email !== null || email !== undefined || !email)
    queue.email = email as string;
  else if (username !== null || username !== undefined || !username)
    queue.username = username as string;
  else return res.status(406).send("JSON request was set inappropietly");
  const isUser = await User.findOne(queue);
  if (isUser == null) return res.status(400).send("Wrong email!");
  else {
    if (!(await comparePassword(isUser.password, password)))
      return res.status(400).send("Wrong password");
    else res.redirect(301, "http://localhost:8080");
  }
});
