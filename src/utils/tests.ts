import faker from "faker";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import ApiServer from "../../server";

faker.seed(127);

export async function synchronize(apiServer: ApiServer) {
  if (!apiServer.connection) {
    throw new Error("Connection failed to initialise");
  }
  await apiServer.connection.synchronize(true);
}

export class Fixtures {
  // Other
  faker: Faker.FakerStatic;

  api = "/v1";

  // Instantiated
  public user: User;

  public userAccessToken: string;

  // Not instantiated
  // Empty for now

  constructor(user: User) {
    this.faker = faker;
    this.user = user;
    this.userAccessToken = `Bearer ${
      user!.createAuthenticationToken().accessToken
    }`;
  }
}

export async function loadFixtures(_apiServer: ApiServer): Promise<Fixtures> {
  const users: User[] = [];
  const user = new User(
    "admin",
    "Admin",
    "test@gmail.com",
    "setMeUp?",
    "setMeUp?"
  );
  users.push(user);

  await getRepository(User).save(users);

  return new Fixtures(user);
}
