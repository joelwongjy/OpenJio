import { Column, Entity, getRepository, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { Jio } from "./Jio";
import { Item } from "./Item";
import { OrderData, OrderListData } from "src/types/orders";
import { User } from "./User";

@Entity()
export class Order extends Discardable {
  entityName = "Order";

  constructor(user: User, jio: Jio) {
    super();
    this.user = user;
    this.paid = false;
    this.jio = jio
  }

  @Column()
  paid: boolean;

  @OneToMany((type) => Item, (item) => item.order)
  items!: Item[];

  @ManyToOne((type) => Jio, (jio) => jio.orders)
  jio!: Jio;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

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
