import { IsNotEmpty, IsString } from 'class-validator';

export class AssignLeadActivityDto {
  @IsString()
  @IsNotEmpty()
  lead_id: string;
}