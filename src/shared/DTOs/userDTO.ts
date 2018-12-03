import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Platform } from '../entity/Platform';
import { Role } from '../entity/Role';

export class UserDTO {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNumber()
		age: number;

		@IsNumber()
		platId: number;

		plat: Platform;

		@IsNumber({
			allowNaN: false,
			allowInfinity: false,
			}, { each: true, // 检查阵列每一个元素是否都是数字
		})
		roleIds: number[];

		roles: Role[];
}
