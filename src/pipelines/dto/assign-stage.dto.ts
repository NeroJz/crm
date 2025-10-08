import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class AssignStateDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  stages: string[];
}