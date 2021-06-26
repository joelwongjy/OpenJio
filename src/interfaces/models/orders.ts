import { DiscardableData } from './base';
import { ItemData } from './items';

export interface OrderPatchData {
  paid?: boolean;
  items?: {
    id: number;
    name?: string;
    quantity?: number;
    cost?: number;
  }[];
}

export interface OrderData extends DiscardableData {
  paid: boolean;
  items: ItemData[];
  cost: number;
}
