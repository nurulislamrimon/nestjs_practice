import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  // buy a course
  async buyCourse(studentCourseDto: { courseId: number; studentId: number }) {
    const { courseId, studentId } = studentCourseDto;

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'], // Load existing students
    });
    if (!course) throw new NotFoundException('Course not found');

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundException('Student not found');

    // Add student to course's student list if not already enrolled
    if (!course.students.find((s) => s.id === studentId)) {
      course.students.push(student);
      await this.courseRepository.save(course);
    }

    return { message: 'Course purchased successfully', course };
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id } });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
