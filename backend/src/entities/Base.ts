import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseData } from "../types/entities";

export abstract class Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  getBase = (): BaseData => ({
    id: this.id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  });

  abstract entityName: string;
}
