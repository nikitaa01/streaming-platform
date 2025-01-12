import { IsNotEmpty, IsString, Matches } from 'class-validator';

const notRelativePathRegex =
  /^(?!.*\/\.\.\/|.*\/\.\.$|.*\/\.$|.*\/\.\.\/.*$|.*\/\.\.\/.*\/$|.*\/\.\.\/.*\/.*$).+$/;

export class PathDto {
  @IsString()
  @IsNotEmpty()
  @Matches(notRelativePathRegex, { message: 'Path can\t contain ./ or ../' })
  path: string;
}
