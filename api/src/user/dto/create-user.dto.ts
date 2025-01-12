import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUserDto {
  name: string;
  last_name: string;

  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid email' })
  email: string;

  @IsNotEmpty()
  @IsUrl(null, { message: 'Please provide valid avatar URL' })
  avatar: string;
}
