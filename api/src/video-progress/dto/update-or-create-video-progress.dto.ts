import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

const notRelativePathRegex =
  /^(?!.*\/\.\.\/|.*\/\.\.$|.*\/\.$|.*\/\.\.\/.*$|.*\/\.\.\/.*\/$|.*\/\.\.\/.*\/.*$).+$/;

export class UpdateOrCreateVideoProgressDto {
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  @Matches(notRelativePathRegex, { message: 'Path can\t contain ./ or ../' })
  path: string;
}
