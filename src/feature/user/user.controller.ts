import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/DTOs/userDTO';
import { UserQueryDTO } from '../../shared/DTOs/queryUserDTO';

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

		// @Get('query/user')
		// queryByPlatformName(@Query('platformName') platformName) {
		// 	return this.userService.getUsersByPlatformName(platformName);
		// }

		@Get('query/user')
		queryByRoleName(@Query() query: UserQueryDTO) {
			return this.userService.getUsersByRoleName(query);
		}
}
