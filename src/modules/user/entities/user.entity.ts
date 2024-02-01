import { BaseEntity } from 'src/generics/commonsKeys';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  fName: string;

  @Column()
  sName: string;

  @Column()
  lName: string;

  @Column()
  // @Unique(['email'])
  email: string;

  @Column()
  professionUser: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  cover: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string;

  // @Column({ default: CommonStatus.ACTIVE })
  @Column({ default: 'ACTIVE' })
  status: string;
}
