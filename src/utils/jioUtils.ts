import { JioFormMode } from 'interfaces/components/jioForm';
import { ItemListData } from 'interfaces/models/items';
import {
  JioData,
  JioListData,
  JioPatchData,
  JioPostData,
} from 'interfaces/models/jios';
import { OrderData } from 'interfaces/models/orders';

export const jioFormVerification = (
  mode: JioFormMode,
  state: JioPostData | JioPatchData,
  jio?: JioListData
): boolean => {
  const { name, closeAt, orderLimit } = state;
  if (mode === JioFormMode.EDIT) {
    return (
      name !== jio!.name ||
      closeAt !== jio!.closeAt ||
      orderLimit !== jio!.orderLimit
    );
  }
  return name !== '' || orderLimit !== 0;
};

export const userHasCreatedOrder = (
  userId: number,
  orders: OrderData[]
): boolean => {
  return orders.map((order) => order.userId).includes(userId);
};

export const getUserOrder = (
  userId: number,
  orders: OrderData[]
): OrderData | undefined => {
  const userOrder = orders.find((order) => order.userId === userId);
  return userOrder;
};

export const getItems = (jio: JioData): ItemListData[] => {
  const items = jio.orders.flatMap((order) => order.items);
  return items;
};

export const costsEntered = (jio: JioData): boolean => {
  const items = jio.orders.flatMap((order) => order.items);
  return (
    items.filter((item) => !!item.cost).length === items.length &&
    items.length > 0
  );
};

export const totalCost = (order: OrderData): number => {
  return order.items.reduce(
    (a, item) => a + Number(item.quantity * (item.cost ?? 0)),
    0
  );
};

