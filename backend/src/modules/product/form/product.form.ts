import { MaxLength, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class ProductPost {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  // @IsInt()
  @IsNotEmpty()
  minimumStock: number;

  // @IsInt()
  @IsNotEmpty()
  currentStock: number;

  @IsNotEmpty()
  costPrice: number;

  @IsNotEmpty()
  resalePrice: number;

  image: any;
}

export class ProductPatch {

  @IsOptional()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  // @IsInt()
  @IsOptional()
  minimumStock: number;

  // @IsInt()
  @IsOptional()
  currentStock: number;

  @IsOptional()
  costPrice: number;

  @IsOptional()
  resalePrice: number;

  image: any;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}