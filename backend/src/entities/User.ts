import { hashSync } from "bcryptjs";
import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { sign } from "jsonwebtoken";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  getRepository,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import IsUniqueUsername from "../constraints/IsUniqueUsername";
import Match from "../constraints/IsMatch";
import { AuthenticationData } from "../types/auth";
import { BearerTokenType } from "../types/tokens";
import { UserData, UserListData } from "../types/users";
import { Discardable } from "./Discardable";
import { Jio } from "./Jio";
import { JioListData } from "src/types/jios";

@Entity()
export class User extends Discardable {
  entityName = "User";

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    super();
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  @Column({ type: "character varying" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Validate(IsUniqueUsername)
  username: string;

  @Column({ type: "character varying" })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ type: "character varying", nullable: true, select: false })
  @MinLength(8)
  password: string | null;

  @Column({ type: "character varying", nullable: true, select: false })
  @MinLength(8)
  @Match("password")
  confirmPassword: string | null;

  @OneToMany((type) => Jio, (jio) => jio.user)
  openJios!: Jio[];

  @ManyToMany(() => Jio)
  @JoinTable()
  joinedJios!: Jio[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = this.password ? hashSync(this.password) : null;
  }

  private createBearerToken = (
    tokenType: BearerTokenType,
    expiresIn: string
  ): string => {
    const payload = {
      tokenType,
      userId: this.id,
    };
    const token = sign(payload, process.env.JWT_SECRET!, { expiresIn });
    return token;
  };

  createAuthenticationToken = (): AuthenticationData => {
    const accessToken = this.createBearerToken(
      BearerTokenType.AccessToken,
      "7d"
    );
    return { accessToken };
  };

  getListData = (): UserListData => ({
    ...this.getBase(),
    username: this.username,
    name: this.name,
  });

  getData = (): UserData => {
    return this.getListData();
  };

  getOpenJioData = async (): Promise<JioListData[]> => {
    const jios =
      this.openJios ||
      (
        await getRepository(User).findOneOrFail({
          where: { id: this.id },
          relations: ["openJios"],
        })
      ).openJios;

    return await Promise.all(jios.map((j: Jio) => j.getListData()));
  };

  getJoinedJioData = async (): Promise<JioListData[]> => {
    const jios =
      this.joinedJios ||
      (
        await getRepository(User).findOneOrFail({
          where: { id: this.id },
          relations: ["joinedJios"],
        })
      ).openJios;

    return await Promise.all(jios.map((j: Jio) => j.getListData()));
  };
}
