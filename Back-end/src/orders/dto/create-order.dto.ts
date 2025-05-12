export class CreateOrderDto {
  userId: number;
  items: { productId: number; quantity: number }[];
}
