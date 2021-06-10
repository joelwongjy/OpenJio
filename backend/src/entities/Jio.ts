import { IsInt, IsNotEmpty, IsPhoneNumber, Min } from "class-validator";
import { JioData, JioListData } from "src/types/jios";
import {
  Column,
  Entity,
  getRepository,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Discardable } from "./Discardable";
import { User } from "./User";

@Entity()
export class Jio extends Discardable {
  entityName = "Jio";

  constructor(
    name: string,
    closeAt: Date,
    paymentNumber: string,
    user: User,
    orderLimit?: number
  ) {
    super();
    this.name = name;
    this.closeAt = closeAt;
    this.paymentNumber = paymentNumber;
    this.user = user;
    this.orderLimit = orderLimit ?? 1000;
  }

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ type: "timestamptz" })
  @IsNotEmpty()
  closeAt: Date;

  @Column({ type: "character varying" })
  @IsNotEmpty()
  @IsPhoneNumber("SG")
  paymentNumber: string;

  @Column({ nullable: true })
  @IsInt()
  @Min(0)
  orderLimit?: number;

  @ManyToOne(() => User, (user) => user.openJios)
  user: User;

  @ManyToMany(() => User, (user) => user.joinedJios)
  @JoinTable()
  joinedUsers!: User[];

  getListData = async (): Promise<JioListData> => {
    const orderCount =
      this.joinedUsers?.length ||
      (await getRepository(User).count({
        where: { joinedJios: { id: this.id } },
      }));
    return {
      ...this.getBase(),
      name: this.name,
      closeAt: this.closeAt,
      user: this.user,
      orderCount,
    };
  };

  getData = async (): Promise<JioData> => {
    const joinedUsers =
      this.joinedUsers ||
      (await getRepository(User).find({
        where: { joinedJios: { id: this.id } },
      }));

    return {
      ...(await this.getListData()),
      joinedUsers,
      paymentNumber: this.paymentNumber,
    };
  };
}
