import { Item } from "src/entities/item";
import { DiscardableData } from "./entities";

export interface OrderPatchData {
  userId?: number;
  paid?: boolean;
  items: Item[];
}

export interface OrderListData extends DiscardableData {
  paid: boolean;
  itemCount: number;
  cost: number;
}

export interface OrderData extends OrderListData {
  items: Item[];
}
