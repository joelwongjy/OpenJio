import { User } from "src/entities/User";
import { DiscardableData } from "./entities";

export interface JioPatchData {
  name: string;
  closeAt: Date;
  paymentNumber: string;
  orderLimit?: number;
  joinedUsers: User[];
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
  user: User;
  orderLimit?: number;
  orderCount: number;
}

export interface JioData extends JioListData {
  joinedUsers: User[];
  paymentNumber: string;
}
