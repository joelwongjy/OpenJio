import { DiscardableData } from './base';
import { OrderData } from './orders';

export interface JioPatchData {
  name?: string;
  closeAt?: Date;
  orderLimit?: number;
  orders: {
    id?: number;
    userId?: number;
    paid?: boolean;
    items?: {
      id?: number;
      name?: string;
      quantity?: number;
      cost?: number;
    }[];
  }[];
}

export interface JioPostData {
  name: string;
  closeAt: Date;
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
