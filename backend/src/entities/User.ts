import { hashSync } from "bcryptjs";
import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { sign } from "jsonwebtoken";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import IsUniqueUsername from "../constraints/IsUniqueUsername";
import Match from "../constraints/IsMatch";
import { AuthenticationData } from "../types/auth";
import { BearerTokenType } from "../types/tokens";
import { UserData } from "../types/users";
import { Discardable } from "./Discardable";

@Entity()
export class User extends Discardable {
  entityName = "User";

  constructor(
    username: string,
    name: string,
    password: string,
    confirmPassword: string
  ) {
    super();
    this.username = username;
    this.name = name;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @Validate(IsUniqueUsername)
  username: string;

  @Column({ type: "character varying" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: "character varying", nullable: true, select: false })
  @MinLength(8)
  password: string | null;

  @Column({ type: "character varying", nullable: true, select: false })
  @MinLength(8)
  @Match("password")
  confirmPassword: string | null;

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

  getData = (): UserData => ({
    ...this.getBase(),
    username: this.username,
    name: this.name,
  });
}
