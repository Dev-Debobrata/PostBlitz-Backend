import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import * as dotenv from "dotenv";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";
import { IsValidUser, passHash } from "../../middleware/passHashing";
import { generateToken } from "../../middleware/token";
import { transporter } from "../../middleware/nodemailerConfig";
dotenv.config({ path: __dirname + "/../../.env" });

const { AUTH_EMAIL } = process.env;

export const postUser = async (req: Request, res: Response): Promise<any> => {
  try {
    let { name, username, password, email, address, pincode, country } =
      req.body;

    const foundUser: IUser | null = await User.findOne({ username });
    if (foundUser !== null) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPass = await passHash(password);

    const user: HydratedDocument<IUser> = new User({
      name,
      username,
      password: hashedPass,
      email,
      address,
      pincode,
      country,
    });
    const token = generateToken(user);
    await user.save();
    const mailBody = {
      from: AUTH_EMAIL,
      to: email,
      subject: "Account Created",
      html: `
        <h1>Your Account has been created successfully</h1>
        <p>Thank you for creating an account in postBlitz, hope you will enjoy our contents. So, let the sink in.</p>
        `,
    };
    transporter.sendMail(mailBody, (error: any) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      res
        .cookie("userToken", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(201)
        .json({
          message: "User created successfully",
        });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const findUser: IUser | null = await User.findOne({ username });
    if (findUser === null) {
      return res.status(404).json({ message: "user does not exist" });
    }
    const userPassword = findUser.password.toString();

    const result = await IsValidUser(password, userPassword);
    if (result === false) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({ message: "Login Successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; // Need To Refresh Token and send it as cookie
