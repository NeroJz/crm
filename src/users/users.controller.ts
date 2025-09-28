import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // return this.usersService.findAll();
    return {
      msg: 'GET Users activated'
    };
  }

  @Get('/activities')
  findActivities(@Request() req) {
    let user = req.user;
    return this.usersService.findAllActivities(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    return {
      msg: 'GET Users by ID activated'
    };
  }

  @Get('/username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
    return {
      msg: 'PATCH Users by ID activated'
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usersService.remove(+id);
    return {
      msg: 'DELETE Users activated'
    };
  }
}
