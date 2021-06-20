import { User } from "src/entities/User";
import { DiscardableData } from "./entities";
import { OrderListData } from "./orders";
export interface JioPatchData {
  name?: string;
  closeAt?: Date;
  paymentNumber?: string;
  orderLimit?: number;
  orders?: {
    id: number;
    userId: number;
    paid?: boolean;
  }[];
}
export interface JioPostData {
  name: string;
  closeAt: Date;
  paymentNumber: string;
  user: User;
  orderLimit?: number;
}
export interface JioListData extends DiscardableData {
  name: string;
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
  orders: OrderListData[];
  paymentNumber: string;
}
