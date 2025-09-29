import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LearningCenterService } from './learning-center.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';

// TODO: Add JwtAuthGuard + CurrentUser decorator

@ApiTags('Learning Center')
@Controller('learning-center')
export class LearningCenterController {
  constructor(private readonly svc: LearningCenterService) {}

  // Courses
  @Post('courses')
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, type: Course })
  async createCourse(@Body() dto: CreateCourseDto) {
    throw new Error('Hook current instructor user here');
  }

  @Get('courses')
  @ApiOperation({ summary: 'List all courses' })
  findAllCourses() {
    return this.svc.findAllCourses();
  }

  @Get('courses/:id')
  @ApiOperation({ summary: 'Get course details' })
  findCourse(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findCourse(id);
  }

  @Put('courses/:id')
  @ApiOperation({ summary: 'Update a course' })
  async updateCourse(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
    throw new Error('Hook current instructor user here');
  }

  @Delete('courses/:id')
  @ApiOperation({ summary: 'Delete a course' })
  async removeCourse(@Param('id', ParseIntPipe) id: number) {
    throw new Error('Hook current instructor user here');
  }

  // Enrollments
  @Post('courses/:id/enroll')
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({ status: 201, type: Enrollment })
  async enroll(@Param('id', ParseIntPipe) id: number) {
    throw new Error('Hook current student user here');
  }

  @Get('enrollments/my')
  @ApiOperation({ summary: 'Get my enrollments' })
  async myEnrollments() {
    throw new Error('Hook current student user here');
  }
}
