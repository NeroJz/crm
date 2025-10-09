import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';

export enum Assignment {
  ASSIGN = "assign",
  UNASSIGN = "unassign"
};

export class AssignStateDto {
  @IsEnum(Assignment)
  type: Assignment;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  stages: string[];
}