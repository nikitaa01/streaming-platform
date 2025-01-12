import { User as UserEntity } from 'src/user/entities/user.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserEntity {}
  }
}
