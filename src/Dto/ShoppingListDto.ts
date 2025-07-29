export interface ShoppingListItemDto {
  productId: number;
  productName: string;
  price: number;
  barcode: string;
  quantity: number;
}
export interface ShoppingListDto {
  id: number;
  title: string;
  items: ShoppingListItemDto[];
}
