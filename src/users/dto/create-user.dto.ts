import { IsString, IsNotEmpty, MaxLength, IsArray, ArrayMinSize, ArrayUnique, IsIn } from 'class-validator';
import { PREDEFINED_ROLES, PREDEFINED_GROUPS } from '../constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(PREDEFINED_ROLES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups: string[];
}
