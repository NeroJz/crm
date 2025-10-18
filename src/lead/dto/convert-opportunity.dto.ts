import { IsNotEmpty, IsString } from 'class-validator';

export class ConvertOpportunityDto {
  @IsString()
  @IsNotEmpty()
  pipelineId: string;
}