import { Request, Response } from "express";

import UserModel from "../models/user";

export class UserController {
  public static async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new Error(`Missing user: ${req.params.id}`);
      }
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  public static async registerUser(
    _req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const newGame = new UserModel({
        game: {},
      });
      await newGame.save();
      return res.json(newGame.id);
    } catch (error) {
      return res.json(error);
    }
  }

  public static async saveGame(req: Request, res: Response): Promise<Response> {
    try {
      const { state, config, id } = req.body;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error(`Missing user: ${id}`);
      }
      user["game"] = {
        state,
        config,
      };
      await user.save();
      return res.json(res.status);
    } catch (error) {
      return res.json(error);
    }
  }
}
