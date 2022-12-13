import { Request, Response } from "express";
import { IsValidUser } from "../../middleware/passHashing";
import { verifyUserToken } from "../../middleware/token";
import { User } from "../../models/user.model";
import { serverError } from "../../utils/errorHandler";
import { IUser } from "../../utils/typings";

/**
 * @description This service is used to update likes given by user. It will check if the user is logged in or not. If the user is logged in then it will take the blog id and update the likes given by the user.
 */

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
    serverError(error, res);
  }
}; // needs to be tested

/**
 * @description This service is used to update user data. It will check if the user is logged in or not. If the user is logged in then it will take the data and update the user data.
 */

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

    if (
      (name == "" &&
        username == "" &&
        country == "" &&
        email == "" &&
        pincode == "" &&
        address == "") ||
      (name == "" && !username && !country && !email && !pincode && !address) ||
      (!name && username == "" && !country && !email && !pincode && !address) ||
      (!name && !username && country == "" && !email && !pincode && !address) ||
      (!name && !username && !country && email == "" && !pincode && !address) ||
      (!name && !username && !country && !email && pincode == "" && !address) ||
      (!name && !username && !country && !email && !pincode && address == "")
    ) {
      return res
        .status(400)
        .json({ message: "Please enter the detail you want to add" });
    }

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
    serverError(error, res);
  }
};

/**
 * @description This service is used to update user password. It will check if the user is logged in or not. If the user is logged in then it will take the password and update the user password.  
 */

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
    serverError(error, res);
  }
};

/**
 * @description This service is used to update user image. It will check if the user is logged in or not. If the user is logged in then it will take the image and update the user image.
 */

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
    serverError(error, res);
  }
};
