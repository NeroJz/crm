import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1, { message: 'SEQ must be greater than 0' })
  seq: number;
}
