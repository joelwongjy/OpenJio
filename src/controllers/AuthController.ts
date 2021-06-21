import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export async function login(
  request: Request,
  response: Response
): Promise<void> {
  try {
    // Try to login using username and password
    const username = request.body.username;
    const password = request.body.password;

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.username = :username", { username })
      .andWhere("user.discardedAt is null")
      .getOne();

    if (!user || !user.password || !compareSync(password, user.password)) {
      throw new Error("Invalid login credentials!");
    }

    const data = user.createAuthenticationToken();
    response.status(200).json(data);
    return;
  } catch (error) {
    response.status(400).json({
      error: error.message ?? "Something went wrong. Please try again!",
    });
  }
}
