import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LearningCenterService {
  constructor(
    @InjectRepository(Course) private coursesRepo: Repository<Course>,
    @InjectRepository(Enrollment) private enrollmentsRepo: Repository<Enrollment>,
  ) {}

  // Courses
  async createCourse(dto: CreateCourseDto, instructor: User) {
    const course = this.coursesRepo.create({ ...dto, instructor });
    return this.coursesRepo.save(course);
  }

  findAllCourses() {
    return this.coursesRepo.find();
  }

  async findCourse(id: number) {
    const c = await this.coursesRepo.findOne({ where: { id } });
    if (!c) throw new NotFoundException('Course not found');
    return c;
  }

  async updateCourse(id: number, dto: UpdateCourseDto, user: User) {
    const course = await this.findCourse(id);
    if (course.instructor.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Not allowed to update this course');
    }
    await this.coursesRepo.update(id, dto);
    return this.findCourse(id);
  }

  async removeCourse(id: number, user: User) {
    const course = await this.findCourse(id);
    if (course.instructor.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Not allowed to delete this course');
    }
    await this.coursesRepo.delete(id);
    return { deleted: true };
  }

  // Enrollments
  async enroll(courseId: number, student: User) {
    const course = await this.findCourse(courseId);
    const enrollment = this.enrollmentsRepo.create({ course, student, status: 'active' });
    return this.enrollmentsRepo.save(enrollment);
  }

  findEnrollmentsForStudent(studentId: number) {
    return this.enrollmentsRepo.find({ where: { student: { id: studentId } } });
  }

  findEnrollmentsForCourse(courseId: number) {
    return this.enrollmentsRepo.find({ where: { course: { id: courseId } } });
  }
}
