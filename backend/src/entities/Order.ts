import { IsNotEmpty } from "class-validator";
import { Column, Entity, getRepository, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { Jio } from "./Jio";
import { Item } from "./Item";
import { OrderData, OrderListData } from "src/types/orders";

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

  getItems = async (): Promise<Item[]> => {
    const items = (
      await getRepository(Order).findOneOrFail({
        where: { id: this.id },
        relations: ["items"],
      })
    ).items;
    return items;
  };

  getListData = async (): Promise<OrderListData> => {
    const items = this.items || (await this.getItems());
    const cost = items.map((item) => item.cost ?? 0).reduce((a, b) => a + b);
    return {
      ...this.getBase(),
      paid: this.paid,
      itemCount: items.length,
      cost,
    };
  };

  getData = async (): Promise<OrderData> => {
    const items = this.items || (await this.getItems());
    return {
      ...(await this.getListData()),
      items,
    };
  };
}
