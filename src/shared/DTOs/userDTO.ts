import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Platform } from '../entity/Platform';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {
		@ApiModelProperty({
			description: 'Username',
		})
    @IsString()
    @MaxLength(100)
    name: string;

		@ApiModelProperty()
    @IsNumber()
		age: number;

		@ApiModelProperty()
		@IsNumber()
		platId: number;

		@ApiModelProperty()
		plat: Platform;

		@ApiModelProperty({required: false})
		@IsNumber({
			allowNaN: false,
			allowInfinity: false,
			}, { each: true, // 检查阵列每一个元素是否都是数字
		})
		roleIds: number[];
}
