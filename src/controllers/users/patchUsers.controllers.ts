import { Request, Response } from "express";
import { IsValidUser } from "../../middleware/passHashing";
import { verifyUserToken } from "../../middleware/token";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";

export const patchUserLikes = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const { likedBlog } = req.body;

    const likedUser: IUser | null = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId,
      },
      {
        likedBlogs: likedBlog,
        updated_At: Date.now(),
      }
    );
    if (likedUser === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Like Added successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; // needs to be tested

export const patchUserData = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const { name, username, country, email, pincode, address } = req.body;

    const updateUser: IUser | null = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId,
      },
      {
        name: name,
        username: username,
        country: country,
        email: email,
        pincode: pincode,
        address: address,
        updated_At: Date.now(),
      }
    );
    if (updateUser === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Data Updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const patchUserPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const { password, newPassword } = req.body;

    const updateUser: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId,
    });
    if (updateUser === null) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPassword = updateUser.password.toString();

    const result = await IsValidUser(password, userPassword);
    if (result === false) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const updatedPassword = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId,
      },
      {
        password: newPassword,
      }
    );

    res.status(200).json({ message: "Data Updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const patchUserImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const updateUser: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId,
    });
    if (updateUser === null) {
      return res.status(404).json({ message: "User not found" });
    }
    const file = <Express.MulterS3.File | undefined>req.file;

    const updatedImage = await User.findOneAndUpdate(
      {
        sessionId: verifiedToken?.userId,
      },
      {
        image: file?.location,
      }
    );

    res.status(200).json({ message: "Data Updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
