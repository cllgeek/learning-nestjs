import { Controller, Post, Body, Get, Param, Put, Query, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/DTOs/userDTO';
import { UserQueryDTO } from '../../shared/DTOs/queryUserDTO';
import { AuthGuard } from '@nestjs/passport';
import { ApiInternalServerErrorResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

// @UseGuards(AuthGuard())
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

		@Post()
		// 回传201的描述
    @ApiCreatedResponse({description: 'User Created'})
    // 回传Internal Error的描述
    @ApiInternalServerErrorResponse({description: 'Invalid Input'})
    addUser(@Body() userDTO: UserDTO) {
      return this.userService.addUser(userDTO);
		}

		@ApiOkResponse({description: 'Return Users '})
		@Get()
		getUsers(@Query() query: UserQueryDTO) {
			return this.userService.getUsers(query);
		}

		@Get(':userId')
		getUserById(@Param('userId') userId) {
			return this.userService.getUserById(userId);
		}

		@Delete(':userId')
		deleteUserById(@Param('userId') userId) {
			return this.userService.deleteUser(userId);
		}

		// @Put(':userId')
		// updateUser(@Param('userId') userId, @Body() userDTO: UserDTO) {
		// 	return this.userService.updateUser(userId, userDTO);
		// }

		// @Put(':userId/:platId')
    // updateUserPlatById(@Param('userId') userId, @Param('platId') platId) {
    //   return this.userService.updateUserPlatById(userId, platId);
		// }

		// @Put(':userId')
    // updateUserRolesByIds(@Param('userId') userId, @Body() userDTO: UserDTO) {
		// 	return this.userService.updateUserById(userId, userDTO);
    //   // return this.userService.updateUserRolesByIds(userId, userDTO);
    // }

		// // @Get('query/user')
		// // queryByPlatformName(@Query('platformName') platformName) {
		// // 	return this.userService.getUsersByPlatformName(platformName);
		// // }

		// @Get('query/user')
		// queryByRoleName(@Query() query: UserQueryDTO) {
		// 	return this.userService.getUsersByRoleName(query);
		// }
}
