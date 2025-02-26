import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  street?: string;
  @Column()
  number?: string;
  @Column({ nullable: true })
  complement?: string;
  @Column({ nullable: true })
  neighborhood?: string;
  @Column({ nullable: true })
  city?: string;
  @Column({ nullable: true })
  state?: string;
  @Column({ nullable: true })
  zipCode?: string;
  @Column({ nullable: true })
  country?: string;
  @Column({ nullable: true })
  latitude?: string;
  @Column({ nullable: true })
  longitude?: string;

  @Column({ nullable: false })
  studentId: number;

  @ManyToOne(() => Student, (student) => student.addresses, { nullable: false })
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
