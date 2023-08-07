import { IsNotEmpty, IsString } from 'class-validator';

export class TipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
