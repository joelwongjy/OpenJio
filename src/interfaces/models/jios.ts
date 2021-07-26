import { DiscardableData } from './base';
import { OrderData } from './orders';

export enum JioState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  COST_ENTERED = 'COST_ENTERED',
  PAYMENT_DONE = 'PAYMENT_DONE',
}

export interface JioPatchData {
  name?: string;
  closeAt?: Date;
  orderLimit?: number;
  deliveryCost?: number;
  discount?: number;
  jioState?: JioState;
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
  jioState: JioState;
  userId: number;
  username: string;
  paylah?: string;
  orderLimit?: number;
  orderCount: number;
}

export interface JioUserData {
  toPay: JioListData[];
  joined: JioListData[];
  opened: JioListData[];
}

export interface JioData extends JioListData {
  deliveryCost: number;
  discount: number;
  orders: OrderData[];
}
