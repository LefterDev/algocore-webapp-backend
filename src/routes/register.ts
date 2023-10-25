import { Request, Response } from "express";
import { Router } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../Schemas/UserSchema";
import generateUserID from "../utils/generateUserID";
import { hashPassword } from "../utils/passwordUtils";
import { sign } from "jsonwebtoken";
import bodyParser from "body-parser";
export const registerRouter: Router = Router();
registerRouter.get("/", (req: Request, res: Response) => {
  res.send("Register page");
});
registerRouter.post(
  "/start-here",
  bodyParser.json(),
  async (req: Request, res: Response) => {
    if (!req.body) return res.status(502).send("Server not responded");
    const { firstName, lastName } = req.body;
    const personalDetails = { first_name: firstName, last_name: lastName };
    const jwtToken = sign(
      {
        data: personalDetails,
        exp: Math.floor(Date.now() / 1000) + 60 * 20,
      },
      process.env.JWT_SECRET as string
    );
    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: true,
      })
      .send(jwtToken);
  }
);
registerRouter.post(
  "/create-user",
  bodyParser.json(),
  async (req: Request, res: Response) => {
    const { token } = req.cookies;
    let decode: Object = {};
    verify(
      decodeURI(token as string) as string,
      process.env.JWT_SECRET as string,
      function (err: any, decoded: any) {
        if (err) return res.status(502).send("Access token doesn't exist.");
        decode = decoded;
      }
    );
    console.log(req.body);
    const { email, username, password } = req.body;
    if (
      req.body == undefined ||
      username == undefined ||
      password == undefined ||
      email == undefined
    )
      return res.status(502).send("Server not responded");
    const queue = await User.findOne({ username: username });
    if (queue !== null)
      return res.status(400).send("This username already exists!");
    new User({
      userid: generateUserID(username),
      personalDetails: decode,
      email: email,
      username: username,
      password: await hashPassword(12, password),
    })
      .save()
      .then(() => {
        res.status(200).send("Registration was successfuly!");
      });
  }
);
