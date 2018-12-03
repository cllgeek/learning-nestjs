import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/DTOs/userDTO';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    addUser(@Body() userDTO: UserDTO) {
      return this.userService.addUser(userDTO);
		}

		@Get()
		getUsers() {
			return this.userService.getUsers();
		}

		@Get(':userId')
		getUserById(@Param('userId') userId) {
			return this.userService.getUserById(userId);
		}

		@Put(':userId')
		updateUser(@Param('userId') userId, @Body() userDTO: UserDTO) {
			return this.userService.updateUser(userId, userDTO);
		}
}
