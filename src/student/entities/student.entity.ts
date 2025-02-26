import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  roll: number;

  @Column({ nullable: false })
  userId: number;

  @OneToOne(() => User, (user) => user.student, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
