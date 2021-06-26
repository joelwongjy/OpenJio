import { DiscardableData } from './base';
import { ItemData } from './items';
import { OrderData } from './orders';

export interface JioPatchData {
  name?: string;
  closeAt?: Date;
  orderLimit?: number;
  orders?: {
    id: number;
    items: ItemData[];
    paid?: boolean;
  }[];
}

export interface JioPostData {
  name: string;
  closeAt: Date;
  paymentNumber: string;
  userId: number;
  orderLimit?: number;
}

export interface JioListData extends DiscardableData {
  name: string;
  joinCode: string;
  createdAt: Date;
  closeAt: Date;
  username: string;
  orderLimit?: number;
  orderCount: number;
}

export interface JioUserData {
  joined: JioListData[];
  opened: JioListData[];
}

export interface JioData extends JioListData {
  orders: OrderData[];
}
