import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User Management')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create new user
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created', type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // Get all users
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async findAll() {
        return this.userService.findAll();
    }

    // Get single user by id
    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    // Update user
    @Put(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(+id, updateUserDto);
    }

    // Delete user
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    async remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
