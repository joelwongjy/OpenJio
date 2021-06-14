import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { Jio } from "./Jio"
import { Item } from "./Item";

@Entity()
export class Order extends Discardable {
  entityName = "Order";

  constructor(userId: number, items: Item[], paid?: boolean) {
    super();
    this.userId = userId;
    this.paid = paid ?? false;
    this.items = items;
  }

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  paid: boolean;

  @OneToMany((type) => Item, (item) => item.order)
  items!: Item[];

  @ManyToOne((type) => Jio, (jio) => jio.orders)
  jio!: Jio;
}