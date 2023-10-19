import { Request, Response } from "express";
import { registerRouter } from "./router";
import { verify } from "jsonwebtoken";
import { User } from "../../Schemas/UserSchema";
import generateUserID from "../../utils/generateUserID";
import { hashPassword } from "../../utils/passwordUtils";

registerRouter.post("/create-user", async (req: Request, res: Response) => {
    const { token } = req.query
    let decode: Object = {};
    verify(decodeURI(token as string) as string, process.env.JWT_SECRET as string, function(err: any, decoded: any){
        if(err) return res.send("Access token doesn't exist.")
        decode = decoded;
    })
    const { email, username, password } = req.body
    const queue = await User.findOne({username: username});
    if(queue !== null) return res.status(400).send("This username already exists!");
    new User(
        {
            userid: generateUserID(username),
            personalDetails: decode,
            email: email,
            username: username,
            password: hashPassword(12, password)
        }
    ).save().then( () => {
        res.status(200).send("Registration was successfuly!");
    }) 
})