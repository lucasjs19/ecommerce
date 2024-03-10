import { Product } from "../../products/model/product";

export interface OrderItems {
    id: number | null;
    product: Product;
    prize: number;
    quantity: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}
