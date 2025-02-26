import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  price: number;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable({ name: 'student_courses' })
  students: Student[];
}
