import { Item } from "src/entities/item";
import { DiscardableData } from "./entities";

export interface OrderPatchData {
  paid?: boolean;
  items?: {
    id: number;
    name?: string;
    quantity?: number;
    cost?: number;
  }[];
}

export interface OrderListData extends DiscardableData {
  paid: boolean;
  itemCount: number;
  cost: number;
}

export interface OrderData extends OrderListData {
  items: Item[];
}
