export class CreateActivityDto {
  type: string;
  description?: string;
  activity_date: Date;
  customer_id: string;
}
