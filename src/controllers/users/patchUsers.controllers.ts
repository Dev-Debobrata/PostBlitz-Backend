import { Request, Response } from "express";
import { User } from "../../models/user.model";

const patchUser = async (req: Request, res: Response): Promise<any> => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; // Work On progress
