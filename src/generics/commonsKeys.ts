import {
  CreateDateColumn,
  DeleteDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TimestampsEntities {
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}

export class BaseEntity extends TimestampsEntities {
  @PrimaryGeneratedColumn("uuid")
  id: string;


}
