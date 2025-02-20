import { Ingredient } from '@prisma/client';
import { ingredients } from './../../../../prisma/constants';
export interface CartItemProps {
  id: number;
  details: string;
  imageUrl: string;
  name: string;
  price: number;
  disabled?: boolean;
  quantity: number;
  className?: string;
}
