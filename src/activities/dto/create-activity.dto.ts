import { User } from 'src/users/entities/user.entity';

export class CreateActivityDto {
  type: string;
  description?: string;
  activity_date: Date;
  customer_name: string;
  user?: User
}
