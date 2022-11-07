import { Request, response, Response } from "express";
import { HydratedDocument } from "mongoose";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";
import { passHash } from "../../middleware/passHashing";
import { generateToken } from "../../middleware/token";
import { upload } from "../../middleware/multerConfig";

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
    res
      .cookie("userToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(201)
      .json({
        message: "User created successfully",
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
