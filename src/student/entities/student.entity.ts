import { Address } from 'src/address/entities/address.entity';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Address, (address) => address.student)
  addresses: Address[];

  @ManyToMany(() => Course, (course) => course.students)
  courses: Course[];
}
