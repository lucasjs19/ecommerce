import { Manufacturer } from "../../manufacturers/model/manufacturer";

export interface Product {
    id: number | null;
    name: string;
    prize: number;
    manufacturer: Manufacturer;
    createdAt: Date | null;
    updatedAt: Date | null;
}
