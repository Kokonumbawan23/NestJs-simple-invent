import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class BarangDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  tipeId: number;
}
