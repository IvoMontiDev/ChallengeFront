export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at_formatted: string;
  userNames?: string[];
}