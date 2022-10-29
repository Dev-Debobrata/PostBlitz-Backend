import { Request, Response } from "express";
import { HydratedDocument } from "mongoose"
import { User } from "../models/user.model";
import { IUser } from "../utils/typings";
import { passHash } from "../utils/passHashing";
import { generateToken } from "../utils/token";


export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user = await User.findOne<IUser>(username);
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



export const postUser = async (req: Request, res: Response) => {

  const {
    name,
    username,
    password,
    email,
    address,
    pincode,
    country
  } = req.body;

  console.log(name, username, password, email, address, pincode, country); // Console-log

  const foundUser = await User.findOne(req.body.username);
  if (foundUser) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }
  // const hashedPass = passHash(password)
  
  const user: HydratedDocument<IUser> = new User({
    name,
    username,
    password,
    email,
    address,
    pincode,
    country
  })

  console.log(user) // console.log
  try {
    const token = generateToken(user);
    await user.save();
    res.cookie("userToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(201)
      .json({
        message: "User created successfully"
      });
    console.log(token);
  } catch (error) {
    res.status(500).send(error);
  }
}
